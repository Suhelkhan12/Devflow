import React from "react";
import ProfileStat from "./profile-stat";

const ProfileStats = () => {
  return (
    <section className="mt-10">
      <span className="paragraph-semibold">Profile Stats</span>
      <div className="mt-3 grid grid-cols-2 gap-5 lg:grid-cols-4">
        <ProfileStat isFirst />
        <ProfileStat medalType="gold" count={10} />
        <ProfileStat medalType="silver" count={130} />
        <ProfileStat medalType="bronze" count={120} />
      </div>
    </section>
  );
};

export default ProfileStats;
