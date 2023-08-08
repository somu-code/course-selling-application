import { useRecoilValue } from "recoil";
import { adminEmailState } from "../store/selectors/adminEmail";
import { adminState } from "../store/atoms/admin";

function Account() {
  const adminEmail = useRecoilValue(adminState);
  console.log(adminEmail);
  return (
    <>
      <p className="text-center text-2xl font-medium mt-12">
        <span>Email: </span>
        <span>{adminEmail.adminEmail}</span>
      </p>
    </>
  );
}

export default Account;
