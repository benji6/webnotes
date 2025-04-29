import { Card } from "eri";
import { NavigateFunction } from "react-router";

interface Props {
  children: string;
  dateCreated: string;
  navigate: NavigateFunction;
}

export default function Note({ children, dateCreated, navigate }: Props) {
  return (
    <Card onClick={() => navigate(`/edit/${dateCreated}`)}>
      <p>{children.split(/[\r\n]+/, 1)[0]}</p>
    </Card>
  );
}
