import ClipLoader from "react-spinners/ClipLoader";


const override = {
  display: "block",
  margin: "100px auto",
  borderColor: "#655bd3",
};

interface SpinnerProps {
    loading:boolean;
}

const spinner = ({loading}:SpinnerProps) => {
  return (
    <ClipLoader
                loading={loading}
                cssOverride={override}
                size={150}
    />
  )
}

export default spinner