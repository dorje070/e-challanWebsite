import { NavLink } from 'react-router-dom';

function TrafficScreen() {
  return (
    <div>
      Traffic Page
      <NavLink to="/traffic/profile" className="NavLink">
        profile
      </NavLink>
    </div>
  );
}

export default TrafficScreen;
