import { CmsEvent } from "../types/civEvents";
import { EventType } from "../types/eventTypes";

function getCmsDateString(daysFromNow: number, hour24: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour24, 0, 0, 0);

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hour12 = date.getHours() % 12 || 12;
  const amPm = date.getHours() >= 12 ? "PM" : "AM";

  return `${year}-${month}-${day} ${hour12}:00 ${amPm}`;
}

export const MOCK_CMS_EVENTS: CmsEvent[] = [
  {
    id: "mock-event-001",
    attributes: {
      fields: {
        title: "Lower East Side Community Clean-Up",
        address: "Tompkins Square Park, Manhattan, NY",
        bio: "Join neighbors for a park clean-up and community resource table.",
        start: getCmsDateString(2, 10),
        categories: "Community, Parks, Mutual aid",
        lat: 40.7265,
        long: -73.9815,
        "event-link": "https://example.org/les-cleanup",
        "event-type": EventType.COMMUNITY,
        "metadata-custom-host-name": "Lower East Side Green Team",
        hostUrl: "https://example.org/green-team",
        coverasset: {
          url: "/Assets/explore_images/mutual_aid.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-002",
    attributes: {
      fields: {
        title: "Harlem Block Association Meet-Up",
        address: "Marcus Garvey Park, Manhattan, NY",
        bio: "Monthly block association gathering with local orgs and tenants.",
        start: getCmsDateString(-12, 18),
        categories: "Voting, Local politics",
        lat: 40.8051,
        long: -73.945,
        "event-link": "https://example.org/harlem-block-association",
        "event-type": EventType.COMMUNITY,
        "metadata-custom-host-name": "Harlem Community Board Partners",
        hostUrl: "https://example.org/harlem-board",
        coverasset: {
          url: "/Assets/explore_images/local_politics.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-003",
    attributes: {
      fields: {
        title: "Uptown Voter Registration Drive",
        address: "Brooklyn Borough Hall Plaza, Brooklyn, NY",
        bio: "Help neighbors check voter status and register on-site.",
        start: getCmsDateString(4, 13),
        "end-date": getCmsDateString(4, 16),
        categories: "Voting, Local politics",
        lat: 40.6925,
        long: -73.9903,
        "event-link": "https://example.org/uptown-voter-drive",
        "event-type": EventType.VOTING,
        "metadata-custom-host-name": "Civic Volunteers NYC",
        hostUrl: "https://example.org/civic-volunteers",
        coverasset: {
          url: "/Assets/explore_images/voting.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-004",
    attributes: {
      fields: {
        title: "Election Day Poll Site Volunteer Shift",
        address: "P.S. 51, Hell's Kitchen, Manhattan, NY",
        bio: "Support voters with directions and accessibility help.",
        start: getCmsDateString(-20, 8),
        "end-date": getCmsDateString(-20, 15),
        categories: "Voting, Volunteering",
        lat: 40.7614,
        long: -73.9931,
        "event-link": "https://example.org/poll-site-volunteer",
        "event-type": EventType.VOTING,
        "metadata-custom-host-name": "Manhattan Civic Coalition",
        hostUrl: "https://example.org/manhattan-civic",
        coverasset: {
          url: "/Assets/explore_images/local_politics.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-005",
    attributes: {
      fields: {
        title: "Virtual Campaign Messaging Workshop",
        address: "Union Square, Manhattan, NY",
        bio: "Online workshop on issue framing and campaign outreach strategy.",
        start: getCmsDateString(6, 19),
        "is-virtual": "true",
        categories: "Campaigns, Education",
        lat: 40.7359,
        long: -73.9911,
        "event-link": "https://example.org/virtual-campaign-workshop",
        "event-type": EventType.CAMPAIGNS,
        "metadata-custom-host-name": "Future Forward Organizers",
        hostUrl: "https://example.org/future-forward",
        coverasset: {
          url: "/Assets/explore_images/education.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-006",
    attributes: {
      fields: {
        title: "Canvassing Kickoff in Washington Heights",
        address: "J. Hood Wright Park, Manhattan, NY",
        bio: "Street canvassing kickoff focused on tenant rights outreach.",
        start: getCmsDateString(-7, 11),
        "end-date": getCmsDateString(-7, 14),
        categories: "Campaigns, Housing rights",
        lat: 40.8468,
        long: -73.9396,
        "event-link": "https://example.org/wash-heights-canvass",
        "event-type": EventType.CAMPAIGNS,
        "metadata-custom-host-name": "North Manhattan Organizing Team",
        hostUrl: "https://example.org/north-manhattan-organizing",
        coverasset: {
          url: "/Assets/explore_images/housing_rights.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-007",
    attributes: {
      fields: {
        title: "Climate March and Rally",
        address: "Union Square, Manhattan, NY",
        bio: "March for climate action with local advocates and youth leaders.",
        start: getCmsDateString(8, 12),
        categories: "Climate change, Demonstrations",
        lat: 40.7359,
        long: -73.9911,
        "event-link": "https://example.org/climate-march",
        "event-type": EventType.DEMONSTRATIONS,
        "metadata-custom-host-name": "NYC Climate Coalition",
        hostUrl: "https://example.org/nyc-climate",
        coverasset: {
          url: "/Assets/explore_images/climate_change.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-008",
    attributes: {
      fields: {
        title: "Workers' Rights March",
        address: "Foley Square, Manhattan, NY",
        bio: "A peaceful march focused on wage protections and worker safety.",
        start: getCmsDateString(-5, 15),
        categories: "Labor rights, Demonstrations",
        lat: 40.7144,
        long: -74.0024,
        "event-link": "https://example.org/workers-rights-march",
        "event-type": EventType.DEMONSTRATIONS,
        "metadata-custom-host-name": "Manhattan Labor Alliance",
        hostUrl: "https://example.org/manhattan-labor",
        coverasset: {
          url: "/Assets/explore_images/labor_rights.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-009",
    attributes: {
      fields: {
        title: "Manhattan Borough Budget Hearing",
        address: "1 Centre St, Manhattan, NY",
        bio: "Public hearing on neighborhood budget priorities and services.",
        start: getCmsDateString(9, 18),
        categories: "Government, Local politics",
        lat: 40.7132,
        long: -74.0047,
        "event-link": "https://example.org/borough-budget-hearing",
        "event-type": EventType.GOVERNMENT,
        "metadata-custom-host-name": "Office of the Manhattan Borough President",
        hostUrl: "https://example.org/manhattan-borough-president",
        coverasset: {
          url: "/Assets/explore_images/local_politics.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-010",
    attributes: {
      fields: {
        title: "Public Education Town Hall",
        address: "Virtual Event (Hosted from Manhattan, NY)",
        bio: "Panel and Q&A on school funding, equity, and student services.",
        start: getCmsDateString(10, 18),
        "is-virtual": "true",
        categories: "Education, Talks",
        lat: 40.7687,
        long: -73.9645,
        "event-link": "https://example.org/education-town-hall",
        "event-type": EventType.TALKS,
        "metadata-custom-host-name": "Manhattan Education Alliance",
        hostUrl: "https://example.org/manhattan-education-alliance",
        coverasset: {
          url: "/Assets/explore_images/education.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-011",
    attributes: {
      fields: {
        title: "Midtown Food Pantry Volunteer Shift",
        address: "Long Island City Community Center, Queens, NY",
        bio: "Sort and distribute groceries for local families.",
        start: getCmsDateString(5, 9),
        "end-date": getCmsDateString(5, 13),
        categories: "Volunteering, Community",
        lat: 40.7448,
        long: -73.9488,
        "event-link": "https://example.org/midtown-pantry",
        "event-type": EventType.VOLUNTEERING,
        "metadata-custom-host-name": "Midtown Mutual Aid",
        hostUrl: "https://example.org/midtown-mutual-aid",
        coverasset: {
          url: "/Assets/explore_images/volunteering.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-012",
    attributes: {
      fields: {
        title: "Know Your Rights Legal Clinic",
        address: "The People's Forum, Manhattan, NY",
        bio: "Free legal-information clinic for workers, tenants, and immigrants.",
        start: getCmsDateString(-10, 17),
        categories: "Immigration, Labor rights, Other",
        lat: 40.7455,
        long: -73.9992,
        "event-link": "https://example.org/know-your-rights",
        "event-type": EventType.OTHER,
        "metadata-custom-host-name": "Manhattan Legal Collective",
        hostUrl: "https://example.org/manhattan-legal",
        coverasset: {
          url: "/Assets/explore_images/immigration.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-013",
    attributes: {
      fields: {
        title: "Community Board 7 Open Session",
        address: "250 W 87th St, Manhattan, NY",
        bio: "Open session on transportation and sanitation proposals.",
        start: getCmsDateString(-3, 18),
        categories: "Government, Local politics",
        lat: 40.7875,
        long: -73.9762,
        "event-link": "https://example.org/cb7-open-session",
        "event-type": EventType.GOVERNMENT,
        "metadata-custom-host-name": "Manhattan Community Board 7",
        hostUrl: "https://example.org/cb7",
        coverasset: {
          url: "/Assets/explore_images/local_politics.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-014",
    attributes: {
      fields: {
        title: "Online Talk: Tenant Organizing Basics",
        address: "Virtual Event",
        bio: "Intro talk on forming tenant associations and advocacy plans.",
        start: getCmsDateString(11, 19),
        "is-virtual": "true",
        categories: "Talks, Housing rights",
        lat: 40.741,
        long: -73.9897,
        "event-link": "https://example.org/tenant-organizing-talk",
        "event-type": EventType.TALKS,
        "metadata-custom-host-name": "Downtown Civic Lab",
        hostUrl: "https://example.org/downtown-civic-lab",
        coverasset: {
          url: "/Assets/explore_images/housing_rights.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-015",
    attributes: {
      fields: {
        title: "East Harlem Community Fridge Restock",
        address: "116th St & Lexington Ave, Manhattan, NY",
        bio: "Volunteer restock shift for neighborhood community fridges.",
        start: getCmsDateString(-6, 10),
        categories: "Volunteering, Mutual aid",
        lat: 40.7975,
        long: -73.9442,
        "event-link": "https://example.org/east-harlem-fridge-restock",
        "event-type": EventType.VOLUNTEERING,
        "metadata-custom-host-name": "East Harlem Mutual Aid",
        hostUrl: "https://example.org/east-harlem-mutual-aid",
        coverasset: {
          url: "/Assets/explore_images/mutual_aid.jpg",
        },
      },
    },
  },
  {
    id: "mock-event-016",
    attributes: {
      fields: {
        title: "Accessibility Audit Walkthrough",
        address: "Bryant Park, Manhattan, NY",
        bio: "Walkthrough to document accessibility barriers in public spaces.",
        start: getCmsDateString(7, 11),
        categories: "Disability rights, Other",
        lat: 40.7536,
        long: -73.9832,
        "event-link": "https://example.org/accessibility-audit",
        "event-type": EventType.OTHER,
        "metadata-custom-host-name": "Inclusive City Project",
        hostUrl: "https://example.org/inclusive-city",
        coverasset: {
          url: "/Assets/explore_images/disability_rights.jpg",
        },
      },
    },
  },
];
