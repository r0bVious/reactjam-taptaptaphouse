import Character from "../Character";

type CustomerProps = {
  position: number;
  returning: boolean;
};

const Customer: React.FC<CustomerProps> = ({ position, returning }) => {
  return (
    <div className="customer" style={{ left: `${position}px` }}>
      <Character returning={returning} />
    </div>
  );
};

export default Customer;
