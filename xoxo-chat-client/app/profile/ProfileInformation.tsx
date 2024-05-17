import ProfileAbout from './ProfileAbout';
import ProfileIntro from './ProfileIntro';

const ProfileInformation = () => {
  return (
    <section className="flex gap-4 px-6">
      <ProfileIntro />
      <ProfileAbout />
    </section>
  );
};

export default ProfileInformation;
