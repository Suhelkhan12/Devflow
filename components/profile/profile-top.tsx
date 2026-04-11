import React from "react";
import ImageWithFallback from "../ImageWithNoSource";
import Link from "next/link";

const ProfileTop = () => {
  return (
    <section className="flex items-start justify-between gap-8">
      <div className="flex items-center gap-5">
        <ImageWithFallback
          src={"/images/Suhel.png"}
          alt="user profile picture"
          width={140}
          height={140}
          className="ring-primary-500 rounded-full ring-2"
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="h1-bold">Suhel khan</h1>
            <p className="text-xs italic">@lslsdjflsjdflsdjflsfjssdjflsd</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <ImageWithFallback src={"/icons/link.svg"} alt="link icon" width={16} height={16} />
              <Link href={"https://example.com"}>https://example.com</Link>
            </div>
            <div className="flex items-center gap-1">
              <ImageWithFallback src={"/icons/location.svg"} alt="localtion icon" width={16} height={16} />
              <span>New York, USA </span>
            </div>
            <div className="flex items-center gap-1">
              <ImageWithFallback src={"/icons/calendar.svg"} alt="calendar icon" width={16} height={16} />
              <span>Joined January 2023</span>
            </div>
          </div>
          <p>
            Launch your development career with project-based coaching - showcase your skills with practical development
            experience and land the coding career of your dreams. Check out jsmastery.pro
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileTop;
