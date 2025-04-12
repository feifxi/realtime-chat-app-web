import { TbUsers } from "react-icons/tb";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(7).fill(null);

  return (
    <aside className="flex flex-col h-full w-14 sm:w-20 lg:w-72 border-r border-base-300 transition-all duration-200" >
      {/* Header */}
      <div className="flex justify-center items-center gap-2 w-full p-5 border-b border-base-300">
        <TbUsers fontSize={25} />
        <span className="hidden lg:block font-bold">Contacts</span>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="mx-auto lg:mx-0">
              <div className="skeleton size-6 sm:size-12 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SidebarSkeleton
