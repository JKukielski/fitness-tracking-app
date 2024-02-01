import '../styles/TargetInput.css';

const TargetInput = () => {
  return (
    <form className="target-container">
      <p className="measurement-heading">Enter your target weight</p>
      <label htmlFor="weight" className="measurement-label">
        Target weight
        <input
          type="number"
          name="target"
          id="target"
          className="measurement-input"
        />
      </label>
      <div className="measurement-button-container">
        <button type="submit" className="primary-button primary-button-bm">
          Submit target
        </button>
      </div>
    </form>
  );
};

export default TargetInput;
