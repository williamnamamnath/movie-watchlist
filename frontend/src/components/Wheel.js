import { useState, useRef } from 'react';

const Wheel = () => {
    const [options, setOptions] = useState(['']);
    const [currentInput, setCurrentInput] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState('');
    const wheelRef = useRef(null);

    const addOption = () => {
        if (currentInput.trim()) {
            setOptions([...options.filter(opt => opt.trim()), currentInput.trim()]);
            setCurrentInput('');
        }
    };

    const removeOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const spinWheel = () => {
        const validOptions = options.filter(opt => opt.trim());
        if (validOptions.length < 2) return;

        setIsSpinning(true);
        setWinner('');

        const randomIndex = Math.floor(Math.random() * validOptions.length);
        const degrees = 360 * 5 + (360 / validOptions.length) * randomIndex;

        if (wheelRef.current) {
            wheelRef.current.style.transform = `rotate(${degrees}deg)`;
        }

        setTimeout(() => {
            setWinner(validOptions[randomIndex]);
            setIsSpinning(false);
        }, 3000);
    };

    const validOptions = options.filter(opt => opt.trim());

    return (
        <div className="my-5 p-4wheel-container text-center" style={{ color: "black" }}>
            <h1 className='mb-4'>Spin the Wheel</h1>
            
            <div className="mb-5 input-section">
                <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addOption()}
                    placeholder="Enter an option"
                />
                <button onClick={addOption}>Add Option</button>
            </div>

            <div className="options-list">
                {validOptions.map((option, index) => (
                    <div key={index} className="option-item">
                        <span>{option}</span>
                        <br/>
                        <button onClick={() => removeOption(index)}>×</button>
                    </div>
                ))}
            </div>

            {validOptions.length >= 2 && (
                <div className="wheel-section">
                    <div className="wheel-wrapper">
                        <div 
                            ref={wheelRef}
                            className={`wheel ${isSpinning ? 'spinning' : ''}`}
                        >
                            {validOptions.map((option, index) => (
                                <div
                                    key={index}
                                    className="wheel-segment"
                                    style={{
                                        transform: `rotate(${(360 / validOptions.length) * index}deg)`,
                                        backgroundColor: `hsl(${(360 / validOptions.length) * index}, 70%, 60%)`
                                    }}
                                >
                                    <span className="segment-text">{option}</span>
                                </div>
                            ))}
                        </div>
                        <div className="wheel-pointer"></div>
                    </div>
                    
                    <button 
                        onClick={spinWheel} 
                        disabled={isSpinning}
                        className="spin-button"
                    >
                        {isSpinning ? 'Spinning...' : 'Spin!'}
                    </button>

                    {winner && (
                        <div className="winner">
                            <h3>Winner: {winner}</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Wheel;