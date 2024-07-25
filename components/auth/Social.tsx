import { FaGithub, FaGoogle } from "react-icons/fa";
import { SecondaryButton } from "../SecondaryButton";

export const Social = () => {
    return (
        <div className="flex gap-2">
            <SecondaryButton className="w-full flex justify-center py-1.5">
                <FaGoogle className="text-xl text-light"/>
            </SecondaryButton>
            <SecondaryButton className="w-full flex justify-center py-1.5">
                <FaGithub className="text-xl text-light"/>
            </SecondaryButton>
        </div>
    );
}