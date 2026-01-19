import PrimaryButton from "../../ui/PrimaryButton/PrimaryButton.jsx";

function IntroScreen({ onStart }) {
  return (
    <div>
      <h2>Welcome to Simon Says</h2>
      <PrimaryButton onClick={onStart}>
        Start Game
      </PrimaryButton>
    </div>
  );
}

export default IntroScreen;
