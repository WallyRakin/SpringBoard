export function MadlibForm({ noun1, noun2, color, adjective, changeNoun1, changeNoun2, changeAdjective, changeColor, toggleSubmit }) {
    return (
        <form onSubmit={toggleSubmit}>
            <input placeholder="noun 1" type="text" onChange={changeNoun1} value={noun1} />
            <br />
            <input placeholder="noun 2" type="text" onChange={changeNoun2} value={noun2} />
            <br />
            <input placeholder="adjective" type="text" onChange={changeAdjective} value={adjective} />
            <br />
            <input placeholder="color" type="text" onChange={changeColor} value={color} />
            <br />
            <button>Get Story</button>
        </form>
    )
};