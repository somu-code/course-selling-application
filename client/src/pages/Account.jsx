import { useRecoilValue } from "recoil";
import { adminEmailState } from "../store/selectors/adminEmail";

function Account() {
  const adminEmail = useRecoilValue(adminEmailState);
  return (
    <>
      <p className="text-center text-2xl font-medium mt-12">
        <span>Email: </span>
        <span>{adminEmail}</span>
      </p>
    </>
  );
}

export default Account;
