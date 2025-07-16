import Image from "next/image"
import { getTeamMemberImage } from "@/lib/avatar-utils"
import type { TeamMember } from "@/lib/database"

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="bg-gray-800/50 border-gray-700 rounded-lg p-6 text-center">
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image
          src={getTeamMemberImage(member) || "/placeholder.svg"}
          alt={member.name}
          width={96}
          height={96}
          className="w-full h-full object-cover rounded-full border-2 border-gray-600"
        />
      </div>
      <h3 className="text-lg font-semibold text-white">{member.name}</h3>
      <p className="text-blue-400 mb-2">{member.role}</p>
      {member.bio && <p className="text-gray-300 text-sm mb-4">{member.bio}</p>}
      {/* Skills, social links, etc. */}
    </div>
  )
}
