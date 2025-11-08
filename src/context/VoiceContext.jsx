import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const VoiceContext = createContext();

const hasSpeechSynthesis = () =>
  typeof window !== "undefined" &&
  "speechSynthesis" in window &&
  "SpeechSynthesisUtterance" in window;

export const VoiceProvider = ({ children }) => {
  const [voices, setVoices] = useState([]);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!hasSpeechSynthesis()) return;

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices() || [];
      const sorted = v.sort((a, b) =>
        a.lang.includes("en-US") && !b.lang.includes("en-US") ? -1 : 1
      );
      setVoices(sorted);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (hasSpeechSynthesis()) window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const getUSVoices = useCallback(() => {
    return voices.filter((v) => v.lang.toLowerCase().includes("en-us"));
  }, [voices]);

  const getVoiceByCharacter = useCallback(
    (character) => {
      const allVoices = getUSVoices();
      if (!allVoices.length) return voices[0];
      const c = (character || "woman").toLowerCase();

      const find = (keywords = []) =>
        allVoices.find((v) =>
          keywords.some((k) => v.name.toLowerCase().includes(k))
        ) || allVoices[0];

      switch (c) {
        case "mom":
        case "sister":
        case "woman":
          return (
            find(["female", "woman", "karen", "samantha"]) ||
            allVoices.find((v) => v.lang.includes("en-US"))
          );
        case "dad":
        case "man":
          return (
            find(["male", "man", "david", "mark", "mike"]) ||
            allVoices.find((v) => v.lang.includes("en-US"))
          );
        case "grandma":
          return (
            find(["female", "karen", "samantha"]) ||
            allVoices.find((v) => v.lang.includes("en-US"))
          );
        case "grandpa":
          return (
            find(["male", "david", "mark"]) ||
            allVoices.find((v) => v.lang.includes("en-US"))
          );
        case "baby":
          return (
            find(["child", "kid", "female", "young"]) ||
            allVoices.find((v) => v.lang.includes("en-US"))
          );
        case "alien":
          return (
            find(["male", "man", "david", "mark", "mike"]) ||
            allVoices.find((v) => v.lang.includes("en-US"))
          );
        default:
          return allVoices[0];
      }
    },
    [getUSVoices, voices]
  );

  const speak = useCallback(
    (text, character = "woman") => {
      if (!hasSpeechSynthesis()) return;
      if (!text || muted) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(String(text));
      const voice = getVoiceByCharacter(character);
      if (voice) utterance.voice = voice;

      const c = (character || "woman").toLowerCase();
      switch (c) {
        case "mom":
          utterance.pitch = 1.3;
          utterance.rate = 0.95;
          break;
        case "dad":
          utterance.pitch = 0.4;
          utterance.rate = 0.9;
          break;
        case "grandma":
          utterance.pitch = 0.9;
          utterance.rate = 0.85;
          break;
        case "grandpa":
          utterance.pitch = 0.4;
          utterance.rate = 0.8;
          break;
        case "baby":
          utterance.pitch = 1.6;
          utterance.rate = 1.0;
          break;
        case "sister":
          utterance.pitch = 1.5;
          utterance.rate = 1.05;
          break;
        case "alien":
          utterance.pitch = 0.1;
          utterance.rate = 1.0;
          break;
        default:
          utterance.pitch = 1.4;
          utterance.rate = 1.0;
      }

      utterance.volume = 1.0;
      utterance.lang = "en-US";

      window.speechSynthesis.speak(utterance);
    },
    [getVoiceByCharacter, muted]
  );

  const stop = useCallback(() => {
    if (!hasSpeechSynthesis()) return;
    window.speechSynthesis.cancel();
  }, []);

  const voiceList = voices.map((v) => ({
    name: v.name,
    lang: v.lang,
    uri: v.voiceURI,
  }));

  return (
    <VoiceContext.Provider
      value={{
        voices: voiceList,
        speak,
        stop,
        muted,
        setMuted,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => useContext(VoiceContext);
export default VoiceContext;
