export function getCfColorClass(rating: number | null | undefined): string {
  if (!rating || rating === 0) return "cf-newbie";
  if (rating < 1200) return "cf-newbie";
  if (rating < 1400) return "cf-pupil";
  if (rating < 1600) return "cf-specialist";
  if (rating < 1900) return "cf-expert";
  if (rating < 2100) return "cf-cm";
  if (rating < 2300) return "cf-master";
  if (rating < 2400) return "cf-im";
  if (rating < 2600) return "cf-gm";
  if (rating < 3000) return "cf-igm";
  return "cf-lgm";
}

export function getCfRankFromRating(rating: number | null | undefined): string {
  if (!rating || rating === 0) return "Unrated";
  if (rating < 1200) return "Newbie";
  if (rating < 1400) return "Pupil";
  if (rating < 1600) return "Specialist";
  if (rating < 1900) return "Expert";
  if (rating < 2100) return "Candidate Master";
  if (rating < 2300) return "Master";
  if (rating < 2400) return "International Master";
  if (rating < 2600) return "Grandmaster";
  if (rating < 3000) return "International Grandmaster";
  return "Legendary Grandmaster";
}
