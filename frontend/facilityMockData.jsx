import playgroundImage from '../images/playground.jpg';
import tennisCourtImage from '../images/asphalt-tennis-court.jpg';
import basketballCourtImage from '../images/basketball-court.jpg';
import soccerFieldImage from '../images/football.jpg';

const mockData = [
  {
    id: 1,
    name: "Playground",
    location: "Area 1",
    image: playgroundImage,
    description:
      "A colorful and safe playground with swings, slides, and monkey bars for children to play on. The playground also features a sandbox and a small climbing wall.",
    capacity: 25,
    equipment: [
      {
        name: "Swing",
        quantity: 4,
        description: "Metal swings with rubber seats and safety chains",
      },
      {
        name: "Slide",
        quantity: 2,
        description: "Tall plastic slides for children with safety rails",
      },
    ],
    visitors: {
      max: 30,
      min: 5,
    },
  },
  {
    id: 2,
    name: "Tennis Court",
    location: "Area 2",
    image: tennisCourtImage,
    description:
      "A full-size, well-maintained tennis court with lights for evening play. The court has a comfortable spectator seating area and nearby water fountains.",
    capacity: 4,
    equipment: [
      {
        name: "Tennis Racket",
        quantity: 4,
        description: "Lightweight, standard tennis rackets suitable for adults and teenagers",
      },
      {
        name: "Tennis Ball",
        quantity: 12,
        description: "High-quality, standard tennis balls with good bounce and durability",
      },
    ],
    visitors: {
      max: 10,
      min: 2,
    },
  },
  {
    id: 3,
    name: "Basketball Court",
    location: "Area 3",
    image: basketballCourtImage,
    description:
      "A regulation-size basketball court with adjustable hoops, line markings, and a scoreboard. The court also has benches for players and a water fountain nearby.",
    capacity: 10,
    equipment: [
      {
        name: "Basketball",
        quantity: 4,
        description: "Regulation-size basketballs with a good grip and air retention",
      },
    ],
    visitors: {
      max: 20,
      min: 2,
    },
  },
  {
    id: 4,
    name: "Soccer Field",
    location: "Area 4",
    image: soccerFieldImage,
    description:
      "A well-maintained, regulation-size soccer field with goals, line markings, and ample sideline space. The field is surrounded by a running track and has a seating area for spectators.",
    capacity: 22,
    equipment: [
      {
        name: "Soccer Ball",
        quantity: 6,
        description: "Standard size and weight soccer balls with good air retention and durability",
      },
      {
        name: "Goal Net",
        quantity: 2,
        description: "High-quality, durable nets for the soccer goals",
      },
    ],
    visitors: {
      max: 30,
      min: 4,
    },
  },
];
