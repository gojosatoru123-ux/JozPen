import Image from "next/image";
import Link from "next/link"

const ProfileCard = ({user}) => {
    return (
        <>
            <li>
                <div key={user.followingId} className="flex items-center shadow-[2px_2px_0px_0px_rgb(0,_0,_0)] p-4 rounded-2xl border-2 bg-white hover:shadow-lg transition-shadow duration-300">
                    <Link href={`/profile/${user.id}`}>
                        <Image src={user.profileUrl || ""} alt={user.name} width={50} height={50} className="profile_image"></Image>
                    </Link>

                    <div className="ml-4">
                        <Link href={`/profile/${user.id}`}><h2 className="text-lg font-semibold text-gray-800">
                            {user.name}
                        </h2></Link>
                    </div>
                </div>
            </li>
        </>
    )
}
export default ProfileCard;