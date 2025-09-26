export default function GoalProgressCard({ title, icon, current, target, subtitle, goalType }) {
  const percentage = Math.round((current / target) * 100);
 
  const getProgressColor = () => {
    switch (goalType) {
      case "sequencial":
        return "var(--pink-100)";
      case "blocos":
        return "var(--green-100)";
      case "fixo":
        return "var(--purple-100)";
      default:
        return "var(--grey-200)";
    }
  };

  return (
    <div className="goal-progress-card-container">
      <div className="goal-progress-card-shadow">
        <div className="goal-progress-card-content">
          <div className="goal-progress-card-header">
            {icon && <img src={icon} alt="Ícone da meta" className="goal-progress-card-icon" />}
            <div className="goal-progress-card-text">
              <h3 className="goal-progress-card-title">{title}</h3>
              <p className="goal-progress-card-subtitle">{subtitle}</p>
            </div>
          </div>
          <div className="goal-progress-card-progress-bar-container">
            <div
              className="goal-progress-card-progress-bar"
              style={{
                width: `${percentage}%`,
                backgroundColor: getProgressColor(), 
              }}
            ></div>
            <span className="goal-progress-card-percentage">{percentage}%</span>
          </div>
          <p className="goal-progress-card-progress-value">
            R${current} de R${target}
          </p>
        </div>
      </div>
    </div>
  );
}
