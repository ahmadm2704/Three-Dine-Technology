export function generateAvatarUrl(name: string, size = 200): string {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  // Using UI Avatars service
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name,
  )}&size=${size}&background=3b82f6&color=ffffff&bold=true`
}

export function getTeamMemberImage(member: { name: string; image_url?: string }): string {
  return member.image_url || generateAvatarUrl(member.name)
}
