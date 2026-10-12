import type { Recommendation } from "@/features/portfolio/types/recommendations"

/**
 * The recommendations on LinkedIn, newest first. Text is verbatim, typos and
 * all; trim the quote, don't reword it.
 */
export const RECOMMENDATIONS: Recommendation[] = [
  {
    name: "Jeff Beene",
    role: "Creative Dev",
    relationship: "Same team",
    date: "2026-09",
    quote:
      "Tori is one of those people who makes a team noticeably better just by being a part of it.",
    text: "Tori is one of those people who makes a team noticeably better just by being a part of it. She's extremely sharp, highly self-motivated, and brings a level of curiosity and care to her work that truly stands out.\n\nWhenever she takes on a project, she goes far beyond simply completing the task. She makes sure she understands the problem deeply, researches how others in the industry are solving similar challenges, and then finds thoughtful, creative solutions that make sense within the context of the business and its technical constraints.\n\nA great example was her work rebuilding our design system in Figma. She worked closely with me on the development side to understand the nuances of our web component library, researched modern design systems extensively, and rebuilt the Figma library from the ground up using modern features and best practices. She even took the initiative to learn WCAG accessibility guidelines and make accessibility a core part of the system. The result was a modern, cohesive component library that raised the bar for our software UI/UX and elevated the work of the entire team.\n\nTori brings that same thoughtful, methodical approach to everything she works on and has been instrumental in modernizing the way our small design and development team operates. She's a genuinely special talent and someone I'd be excited to work with on any team.",
  },
  {
    name: "Filip Erak",
    role: "Software Developer",
    relationship: "Same team",
    date: "2026-09",
    quote:
      "What stood out most was how well she understood the way developers think and work.",
    text: "I had the pleasure of working with Tori on the design system overhaul, and she was an incredible designer to work with. What stood out most was how well she understood the way developers think and work. Rather than designing in isolation and handing it off, she took the time to understand the technical constraints, think through implementation, and work with us to land on the best solution. Tori has a great eye for design, but it's her grasp of the development process that makes her especially valuable on any team. If she's involved in a project, you know the end result will be amazing.",
  },
  {
    name: "Justin Savage",
    role: "Software Engineer",
    relationship: "Different teams",
    date: "2026-09",
    quote:
      "She vastly improved our design system and frequently collaborated with my team to make the process more effective.",
    text: "I had the pleasure of working with Tori for the past few years. She vastly improved our design system and frequently collaborated with my team to make the process more effective. She's a talented designer, and I would gladly work with her again.",
  },
  {
    name: "Jackson McCaslin",
    role: "Frontend Developer",
    relationship: "Same team",
    date: "2023-09",
    quote:
      "She is one of the few designers I’ve met who has taken up the challenge of learning to code so she can understand the engine that will power her work and design for it even better.",
  },
  {
    name: "Caroline Hoffman",
    role: "Marketing & Event Management",
    relationship: "Different teams",
    date: "2023-05",
    quote:
      "Her motivating energy is one of my favorite parts of coming to work!",
    text: "Tori is such an amazing co-worker! She is a ray of sunshine and always brings a smile wherever she goes. She's hardworking and determined to get every aspect of her work to be perfect. When I first started working with Tori, I immediately knew we'd be friends. Her motivating energy is one of my favorite parts of coming to work!",
  },
  {
    name: "Jerize Bravo",
    role: "Digital Designer",
    relationship: "Same team",
    date: "2023-03",
    quote:
      "Her ideas are creative, and her execution is beautiful and thinking outside the box is her speciality.",
    text: "Tori Bryan is a wonderful, talented designer with a huge love and passion for what she does. She works so hard every day to learn more about design, and ensures that everyone around her knows how hard they are working too. She takes criticism as a way to be better and it is extremely reflected in her amazing work. Everyday I worked with Tori, it was another day I felt happy and motivated to work just as hard. Not only is she an amazing employee but an amazing partner. Working along side her and seeing how incredible the product can turn out when we work together is astonishing, and saying that I work with Tori Bryan is an honor. Anyone lucky enough to have her on her team will have a hard, wonderful and smart worker coming their way. Her ideas are creative, and her execution is beautiful and thinking outside the box is her speciality. She's been working hard for a year and counting, and I am so excited to see how much more she will grow in the next year.",
  },
]

/** The anchor for a recommendation on the recommendations page. */
export function recommendationId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
}
