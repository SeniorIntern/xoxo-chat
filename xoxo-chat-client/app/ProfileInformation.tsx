import ProfileBio from './profile/ProfileBio';

const ProfileInformation = () => {
  return (
    <section className="mt-4 flex gap-4 px-6">
      <ProfileBio />

      <div className="w-[58%] rounded-md bg-[var(--secondary-gray)] p-2">
        <p className="text-xl font-bold">About</p>
        <p>
          {'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.'.substring(
            0,
            300
          )}
        </p>
      </div>
    </section>
  );
};

export default ProfileInformation;
