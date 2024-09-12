import "./Suggestions.css";

const Suggestions = () => {
  return (
    <div className="suggestions-container">
      <h1>Suggestions</h1>
      <ul>
        <li className="category">Katete Bridge</li>
        <li className="category">
          <h2>Popular restaurants</h2>
          <p>Mama Dona Restaurant</p>
        </li>
        <li className="category">
          <h2>Transport Options</h2>
          <ul>
            <li>Taxi</li>
            <li>Foot</li>
            <li>Boda</li>
          </ul>
        </li>
        <li className="category">
          <h2>Customer reviews</h2>
          <ul>
            <li>Amos: This is a great place</li>
            <li>John: Wow it's amazing</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Suggestions;
