import { StyledTab } from './TabStyles';

const Tab = ({ active, children, onClick }) => {
    return (
      <StyledTab active={active.toString()} onClick={onClick}>
        {children}
      </StyledTab>
    );
  };
  
  export default Tab;