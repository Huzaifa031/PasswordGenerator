import { useState, useCallback, useEffect, useRef } from 'react';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/solid';

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+=[]{}|;:',.<>?~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
    setCopied(false); // Reset copied state whenever password changes

  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true); // Show "Copied" feedback
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 p-6">
      <div className="max-w-md w-full bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center mb-4">🔐 Password Generator</h1>

        {/* Password Display and Copy */}
        <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden shadow-md mb-4">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="w-full py-3 px-4 bg-gray-700 text-white text-lg placeholder-gray-500 focus:outline-none"
            placeholder="Generated password"
          />
          <button
            onClick={copyPasswordToClipboard}
            className={`flex items-center justify-center p-2 w-12 h-12 transition-colors duration-200 ${copied ? 'bg-green-500' : 'bg-blue-600'} hover:bg-blue-700`}
            aria-label="Copy password"
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? <CheckIcon className="w-6 h-6 text-white" /> : <ClipboardIcon className="w-6 h-6 text-white" />}
          </button>
        </div>

       
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium">Length:</label>
          <input
            type="range"
            min={6}
            max={24}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="flex-grow cursor-pointer bg-blue-600"
          />
          <span className="text-lg font-semibold">{length}</span>
        </div>

       
        <div className="flex items-center justify-between space-y-2 mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
            />
            <span className="text-sm">Include Numbers</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
            />
            <span className="text-sm">Include Symbols</span>
          </label>
        </div>

       
        <button
          onClick={passwordGenerator}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200 mt-6"
        >
          Generate New Password
        </button>
      </div>
    </div>
  );
}

export default App;
