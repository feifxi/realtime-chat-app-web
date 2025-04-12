import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { IoCameraOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import avatar from "../assets/image/avatar.jpg";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file || isUpdatingProfile) return;
    if (!file.type.startsWith("image/")) return toast.error("Please select an image file")

    const maxSizeInBytes = 2 * 1024 * 1024; // max size in MB - 2mb
    if (file.size > maxSizeInBytes) return toast.error("File size too large");

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64Img = reader.result
      setSelectedImg(base64Img)
      await updateProfile(base64Img)
    }
    reader.readAsDataURL(file)
  };

  const PROFILE_INFO = [
    {
      field: "Full Name",
      value: authUser.fullname,
      icon: <FaRegUser className="text-lg" />,
    },
    {
      field: "Email Address",
      value: authUser.email,
      icon: <MdOutlineEmail className="text-xl" />,
    },
  ];
  
  const ACCOUNT_INFO = [
    {
      field: "Member Since",
      value: authUser.createdAt.split("T")[0],
    },
    {
      field: "Account Status",
      value: "Active",
      highlight: true,
    },
  ];

  return (
    <section className="px-8 sm:px-16">
      <div className="py-5 mx-auto w-full max-w-2xl">
        <div className="p-6 bg-base-300 rounded-xl">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p>Your profile information</p>
          </div>
          {/* Profile upload section */}
          <div className="flex flex-col items-center mt-6">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || avatar}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="profile-upload"
                className={`absolute bottom-0 right-0 p-2 bg-base-content rounded-full cursor-pointer hover:scale-105 duration-200  ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <IoCameraOutline className="text-2xl text-base-100" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400 mt-3">
              {isUpdatingProfile
                ? "uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          {/* Profile Info */}
          <div className="space-y-3 mt-5">
            {PROFILE_INFO.map((info) => (
              <div className="space-y-1.5" key={info.field}>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  {info.icon}
                  {info.field}
                </div>
                <p className="border px-4 py-2.5 bg-base-200 rounded-lg">
                  {info.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Account Info Section */}
        <div className="p-6 mt-5 bg-base-300 rounded-xl">
          <h2 className="text-lg">Account Information</h2>
          <div className="divide-y divide-zinc-700 mt-3">
            {ACCOUNT_INFO.map((info) => (
              <div className="flex justify-between items-center py-3 text-sm" key={info.field}>
                <span>{info.field}</span>
                <span className={info.highlight ? "text-green-500" : ""}>
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
