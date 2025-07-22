const mermaidExamples = {
  flowchart: {
    name: "1. Basic Flowchart",
    code: `graph TD
    A[Start] --> B{Is it valid?};
    B -- Yes --> C[Process];
    C --> D[End];
    B -- No --> E[Error];
    E --> D;`,
  },
  sequence: {
    name: "2. Sequence Diagram",
    code: `sequenceDiagram
    participant User
    participant WebServer
    participant Database
    User->>WebServer: GET /api/data
    WebServer->>Database: SELECT * FROM records;
    Database-->>WebServer: Data records
    WebServer-->>User: [200 OK] Data payload`,
  },
  gantt: {
    name: "3. Gantt Chart (Expanded)",
    code: `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    axisFormat %Y-%m-%d
    section Research & Planning
    Market Research :done, r1, 2024-01-01, 10d
    Create Specs   :done, r2, after r1, 5d
    section Development
    Backend API     :active, dev1, after r2, 20d
    Frontend UI     :dev2, after r2, 25d
    section Testing
    Unit Tests      :test1, after dev1, 5d
    Integration     :test2, after dev2, 7d`,
  },
  class: {
    name: "4. Class Diagram",
    code: `classDiagram
    class Animal {
      +String name
      +Number age
      +eat()
    }
    class Dog {
      +String breed
      +bark()
    }
    class Cat {
      +Boolean isNapping
      +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
    Animal "1" -- "*" Owner : has`,
  },
  state: {
    name: "5. State Diagram",
    code: `stateDiagram-v2
    [*] --> Off
    Off --> On : switch_on
    On --> Off : switch_off
    On --> Suspended : pause
    Suspended --> On : resume`,
  },
  pie: {
    name: "6. Pie Chart",
    code: `pie
    title Browser Market Share
    "Chrome" : 64.8
    "Safari" : 19.9
    "Edge" : 5.5
    "Firefox" : 3.0
    "Others" : 6.8`,
  },
  journey: {
    name: "7. User Journey",
    code: `journey
    title My Workday
    section Go to work
      Make coffee: 5: Me
      Drive to work: 3: Me, Colleague
      Find parking: 2: Me
    section Do work
      Team stand-up: 7: Me, Colleague
      Collaborate on code: 8: Me
      Review PRs: 6: Me`,
  },
  er: {
    name: "8. ER Diagram",
    code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses

    CUSTOMER {
      string name
      string email
      string address
    }
    ORDER {
      int orderId
      datetime createdDate
    }
    LINE-ITEM {
      string product
      int quantity
      float price
    }`,
  },
  git: {
    name: "9. Git Graph",
    code: `gitGraph
    commit
    commit
    branch feature-a
    checkout feature-a
    commit
    commit
    checkout main
    merge feature-a
    commit
    branch release
    checkout release
    commit`,
  },
  mindmap: {
    name: "10. Mind Map",
    code: `mindmap
  root((My Mind Map))
    )Main Topic 1(
      Sub-topic A
      Sub-topic B
    )Main Topic 2(
      [Sub-topic C]
      (Sub-topic D)
    Main Topic 3
      Sub-topic E`,
  },
  timeline: {
    name: "11. Timeline",
    code: `timeline
    title History of Web Browsers
    1990 : WorldWideWeb
    1993 : Mosaic
    1994 : Netscape Navigator
    1995 : Internet Explorer
    2004 : Firefox
    2008 : Chrome`,
  },
  quadrant: {
    name: "12. Quadrant Chart",
    code: `quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]`,
  },
  flowchartShapes: {
    name: "13. Flowchart (Shapes)",
    code: `graph TD
    A[Rectangle] --> B(Rounded)
    B --> C((Circle))
    C --> D{Diamond}
    D --> E>Asymmetric]
    E --> F[/Parallelogram/]
    F --> G[\\Hexagon\\]
    G --> A`,
  },
  flowchartLinks: {
    name: "14. Flowchart (Links)",
    code: `graph LR
    A -- text --> B
    C --- D
    E --o text o-- F
    G --x text x-- H
    I ==> J
    K <--> L`,
  },
  flowchartSubgraphs: {
    name: "15. Flowchart (Subgraphs)",
    code: `graph TB
    c1(Start) --> a2
    subgraph "Group A"
        a1("Node A1") --> a2("Node A2")
    end
    subgraph "Group B"
        b1("Node B1") --> b2("Node B2")
    end
    a2 --> b1
    b2 --> c2(End)`,
  },
  flowchartStyled: {
    name: "16. Flowchart (Styled)",
    code: `graph LR
    id1(Start)-->id2(Stop)
    style id1 fill:#f9f,stroke:#333,stroke-width:4px
    style id2 fill:#ccf,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5`,
  },
  flowchartClickable: {
    name: "17. Flowchart (Clickable)",
    code: `graph TD
    A[Mermaid Docs] --> B[GitHub];
    click A "https://mermaid.js.org/" "Go to Mermaid Docs"
    click B "https://github.com/mermaid-js/mermaid" "Go to GitHub"`,
  },
  flowchartCICD: {
    name: "18. Flowchart (CI/CD)",
    code: `graph TD
    A[Push to Repo] --> B{Build};
    B -- Success --> C[Run Tests];
    B -- Failure --> F[Notify Failure];
    C -- Success --> D[Deploy to Staging];
    C -- Failure --> F;
    D --> E{Manual Approval?};
    E -- Yes --> G[Deploy to Production];
    E -- No --> H[End];
    G --> H;`,
  },
  sequenceParallel: {
    name: "19. Sequence (Parallel)",
    code: `sequenceDiagram
    participant A
    participant B
    participant C
    A->>B: Request 1
    par
        B->>C: Sub-request A
    and
        B->>A: Immediate Ack
    end`,
  },
  sequenceActors: {
    name: "20. Sequence (Actors & Notes)",
    code: `sequenceDiagram
    actor User
    participant System
    Note left of User: User needs to login
    User->>System: Enters credentials
    System->>System: Validate credentials
    System-->>User: Login Successful
    Note right of System: User session created`,
  },
  sequenceActivations: {
    name: "21. Sequence (Activations)",
    code: `sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    activate Bob
    Bob->>Charlie: I am good, how are you?
    activate Charlie
    Charlie-->>Bob: I am good too!
    deactivate Charlie
    Bob-->>Alice: I am good!
    deactivate Bob`,
  },
  stateNested: {
    name: "22. State (Nested)",
    code: `stateDiagram-v2
    state "Media Player" as P1 {
        [*] --> Stopped
        Stopped --> Playing : play
        Playing --> Paused : pause
        Paused --> Playing : play
        Playing --> Stopped : stop
    }`,
  },
  stateForks: {
    name: "23. State (Forks)",
    code: `stateDiagram-v2
    state fork_state <<fork>>
      [*] --> fork_state
      fork_state --> State2
      fork_state --> State3

      state join_state <<join>>
      State2 --> join_state
      State3 --> join_state
      join_state --> [*]`,
  },
  requirement: {
    name: "24. Requirement Diagram",
    code: `requirementDiagram

requirement "REQ-001" {
    id: 1
    text: The system shall allow user login.
    risk: High
    verifymethod: Test
}

element "LoginButton" {
    type: "GUI Element"
}

LoginButton - satisfies -> "REQ-001"`,
  },
  c4context: {
    name: "25. C4 Context Diagram",
    code: `C4Context
    title System Context diagram for Internet Banking System
    Person(customer, "Customer", "A customer of the bank, with personal bank accounts.")
    System(bankingSystem, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")

    System_Ext(mainFrame, "Mainframe Banking System", "Stores all of the core banking information about customers, accounts, transactions, etc.")

    Rel(customer, bankingSystem, "Uses")
    Rel(bankingSystem, mainFrame, "Uses")`,
  },
  sankeyReplaced: {
    name: "26. Detailed User Journey",
    code: `journey
    title Customer Support Ticket Process
    section Ticket Creation
      User finds issue: 2: User
      User contacts support: 3: User
      Support agent creates ticket: 5: Agent
    section Investigation
      Agent investigates issue: 8: Agent
      Agent collaborates with Devs: 6: Agent, Devs
    section Resolution
      Devs deploy a fix: 7: Devs
      Agent verifies fix: 5: Agent
      Agent notifies User: 6: Agent`,
  },
  blockReplaced: {
    name: "27. Complex Flowchart",
    code: `graph TD
    subgraph "User Interaction"
        A[Visit Website] --> B{Login?};
    end
    subgraph "Authentication"
        B -- Yes --> C[Authenticate];
        B -- No --> D[Guest Session];
    end
    subgraph "Core Logic"
        C --> E[Load User Data];
        D --> F[Load Public Data];
        E --> G[Display Dashboard];
        F --> G;
    end`,
  },
  xychartReplaced: {
    name: "28. Detailed Gantt Chart",
    code: `gantt
    title App Release Schedule
    dateFormat  YYYY-MM-DD
    section Feature Development
    Login Module     :done, a1, 2024-05-01, 10d
    Profile Module   :active, a2, after a1, 15d
    Dashboard Module :a3, after a2, 20d
    section Quality Assurance
    QA on Login      :crit, q1, after a1, 4d
    QA on Profile    :crit, q2, after a2, 6d
    Final Regression :crit, q3, after a3, 5d`,
  },
  classGenerics: {
    name: "29. Class (Generics) - Corrected",
    code: `classDiagram
    class List~T~ {
      -T[] items
      +add(T item)
      +get(int index) T
    }
    class StringList {
    }
    List~String~ <|-- StringList`,
  },
  pieBudget: {
    name: "30. Pie Chart (Budget)",
    code: `pie
    title Monthly Budget Allocation
    "Housing" : 35
    "Food" : 20
    "Transport" : 15
    "Savings" : 15
    "Entertainment" : 10
    "Utilities" : 5`,
  },
  flowchartWithComments: {
    name: "31. Flowchart with Comments",
    code: `graph TD
    %% This is a comment
    A[Start] --> B{Decision};
    B -- Choice 1 --> C[Result 1];
    B -- Choice 2 --> D[Result 2];`,
  },
  sequenceWithLoops: {
    name: "32. Sequence with Loops",
    code: `sequenceDiagram
    participant A
    participant B
    loop 10 times
        A->>B: Do something
        B-->>A: Did something
    end`,
  },
  classWithInterfaces: {
    name: "33. Class with Interfaces",
    code: `classDiagram
    class Shape{
      <<interface>>
      +getArea()
    }
    class Circle{
      -int radius
      +getArea()
    }
    class Rectangle{
      -int width
      -int height
      +getArea()
    }
    Shape <|.. Circle
    Shape <|.. Rectangle`,
  },
  stateWithConcurrency: {
    name: "34. State with Concurrency",
    code: `stateDiagram-v2
    [*] --> Active

    state Active {
        state "Streaming" as S1 {
            [*] --> Video
            Video --> Audio
        }
        --
        state "Recording" as S2 {
            [*] --> Mic
            Mic --> Camera
        }
    }`,
  },
  ganttWithMilestones: {
    name: "35. Gantt with Milestones (Expanded)",
    code: `gantt
    dateFormat  YYYY-MM-DD
    axisFormat %Y-%m
    title Project Milestones
    section Phase 1: Foundation
    Setup Environments : 2024-01-01, 5d
    Initial Design     : after Setup Environments, 10d
    Design Approval    : milestone, m1, 2024-01-16, 0d
    section Phase 2: Implementation
    Core Logic Dev     : after m1, 20d
    API Integration    : after Core Logic Dev, 15d
    Phase 2 Complete   : milestone, m2, after API Integration, 0d`,
  },
  mindmapMultilevel: {
    name: "36. Mindmap Multilevel",
    code: `mindmap
  root((Project))
    )Phase 1(
      Research
        )Market Analysis(
        )Competitor Study(
      Planning
    )Phase 2(
      Development
        Backend
        Frontend
      Testing
    )Phase 3(
      Deployment`,
  },
  timelineWithMultipleLines: {
    name: "37. Timeline with Multiple Lines",
    code: `timeline
    title Project X Development
    2023 : Conception & Funding
         : Team Formation
    2024 : Prototyping
         : Alpha Release
         : Beta Testing
    2025 : Official Launch`,
  },
  erWithManyRelationships: {
    name: "38. ER Diagram (Many-to-Many)",
    code: `erDiagram
    STUDENT ||--|{ ENROLLMENT : has
    COURSE ||--|{ ENROLLMENT : is
    TEACHER }o--|| COURSE : teaches

    STUDENT {
      int studentId
      string name
    }
    COURSE {
      int courseId
      string title
    }
    TEACHER {
      int teacherId
      string name
    }`,
  },
  gitGraphWithHotfix: {
    name: "39. Git Graph (Hotfix)",
    code: `gitGraph
   commit id: "v1.0"
   branch develop
   commit
   checkout main
   branch hotfix
   checkout hotfix
   commit
   checkout main
   merge hotfix
   commit id: "v1.0.1"
   checkout develop
   merge main`,
  },
  c4Container: {
    name: "40. C4 Container Diagram",
    code: `C4Container
    title Container diagram for Internet Banking System
    
    Person(customer, "Customer", "A customer of the bank.")
    
    System_Boundary(c1, "Internet Banking System") {
        Container(web_app, "Web Application", "Java, Spring MVC", "Delivers the static content and SPA.")
        Container(spa, "Single-Page App", "JavaScript, Angular", "Provides all the internet banking functionality.")
        Container(api, "API Application", "Java, Spring Boot", "Handles all business logic.")
        ContainerDb(db, "Database", "SQL Database", "Stores user profiles, accounts, and transactions.")
    }

    System_Ext(mainframe, "Mainframe Banking System", "Stores all core banking information.")

    Rel(customer, web_app, "Uses", "HTTPS")
    Rel(web_app, spa, "Delivers", "HTTPS")
    Rel(spa, api, "Uses", "JSON/HTTPS")
    Rel(api, db, "Reads from/writes to", "SQL")
    Rel(api, mainframe, "Uses", "XML/HTTPS")`,
  },
  sequenceWithAlt: {
    name: "41. Sequence with Alternatives",
    code: `sequenceDiagram
    participant User
    participant Server
    User->>Server: Login(user, pass)
    alt credentials are valid
        Server-->>User: OK
    else credentials are invalid
        Server-->>User: Error
    end`,
  },
  flowchartWithUnicode: {
    name: "42. Flowchart with Unicode",
    code: `graph TD
    A[Start] --> B[Process Data 流入];
    B --> C{Check Status ✅};
    C -- OK --> D[Finish 🎉];
    C -- Fail --> E[Alert ⚠️];`,
  },
  classWithComposition: {
    name: "43. Class with Composition",
    code: `classDiagram
    class House {
      -Room[] rooms
    }
    class Room {
      -int windows
    }
    House o-- "1..*" Room`,
  },
  stateWithNotes: {
    name: "44. State Diagram with Notes",
    code: `stateDiagram-v2
    [*] --> Idle
    note right of Idle
        The system is waiting
        for user input.
    end note
    Idle --> Processing : event
    Processing --> Idle : done`,
  },
  pieWithCustomStyling: {
    name: "45. Pie Chart with Customization",
    code: `pie
    title Technology Usage
    "Go" : 25
    "Python" : 45
    "Rust" : 20
    "JavaScript" : 10`,
  },
  journeyWithFeelings: {
    name: "46. User Journey with Scores",
    code: `journey
    title Online Purchase
    section Browse
      Find product: 5: Me
      Read reviews: 4: Me
    section Checkout
      Add to cart: 5: Me
      Enter shipping info: 3: Me
      Payment failed: 1: Me`,
  },
  requirementWithElements: {
    name: "47. Requirement Diagram with Elements",
    code: `requirementDiagram
    
    requirement REQ_2 {
        id: 2
        text: Must support dark mode.
        risk: Medium
        verifymethod: Inspection
    }

    element "ThemeSwitcher" {
        type: "GUI Button"
    }

    "ThemeSwitcher" - satisfies -> REQ_2`,
  },
  quadrantWithMorePoints: {
    name: "48. Quadrant Chart with More Points",
    code: `quadrantChart
    title Task Prioritization Matrix
    x-axis Low Urgency --> High Urgency
    y-axis Low Importance --> High Importance
    quadrant-1 "Do"
    quadrant-2 "Schedule"
    quadrant-3 "Delegate"
    quadrant-4 "Eliminate"
    "Fix critical bug": [0.9, 0.9]
    "Plan new feature": [0.4, 0.8]
    "Update documentation": [0.2, 0.3]
    "Team lunch": [0.1, 0.5]`,
  },
  sankeyReplaced2: {
    name: "49. Detailed Mindmap",
    code: `mindmap
  root((Mobile App Features))
    ---
    ))Core Features((
      - User Authentication
        - Login / Logout
        - Password Reset
      - Profile Management
      - Main Dashboard
    ))Monetization((
      - Subscription Tiers
        - Free
        - Pro
        - Enterprise
      - In-App Purchases
    ))Settings((
      - Notifications
      - Theme (Light/Dark)`,
  },
  blockReplaced2: {
    name: "50. Login State Machine",
    code: `stateDiagram-v2
    [*] --> NotLoggedIn
    NotLoggedIn --> Authenticating : enter_credentials
    Authenticating --> LoggedIn : success
    Authenticating --> NotLoggedIn : failure
    LoggedIn --> [*] : logout`,
  },
  xychartReplaced2: {
    name: "51. Complex Sequence Diagram",
    code: `sequenceDiagram
    autonumber
    participant Client
    participant AuthServer
    participant ApiServer
    
    Client->>ApiServer: Request protected resource
    activate ApiServer
    ApiServer-->>Client: 401 Unauthorized
    deactivate ApiServer
    
    Client->>AuthServer: Request token(user, pass)
    activate AuthServer
    AuthServer-->>Client: AccessToken
    deactivate AuthServer
    
    Client->>ApiServer: Request protected resource (with Token)
    activate ApiServer
    ApiServer->>ApiServer: Validate Token
    ApiServer-->>Client: [200 OK] Protected data
    deactivate ApiServer`,
  },
  flowchartWithNodesInColumns: {
    name: "52. Flowchart with Columns (Swimlanes)",
    code: `graph TD
    subgraph "Client"
        A[Request]
    end
    subgraph "Server"
        B{Validate}
        C[Process]
        D[Response]
    end
    A --> B
    B -- Valid --> C
    B -- Invalid --> D
    C --> D`,
  },
  sequenceWithGrouping: {
    name: "53. Sequence with Grouping (Box)",
    code: `sequenceDiagram
    box "Authentication Service"
        participant A
        participant B
    end
    box "Storage Service"
        participant C
    end
    A->>B: Validate Token
    B->>C: Get User Data`,
  },
  classWithEnum: {
    name: "54. Class with Enum",
    code: `classDiagram
    class Order {
      -OrderStatus status
    }
    class OrderStatus {
      <<enumeration>>
      PENDING
      SHIPPED
      DELIVERED
      CANCELED
    }
    Order o-- OrderStatus`,
  },
  stateWithHistory: {
    name: "55. State with History",
    code: `stateDiagram-v2
    state "MusicPlayer" as MP {
        state "Paused" as Paused {
            state "History" as H
        }
        [*] --> Paused
        Paused --> Playing : play
        Playing --> Paused : pause
    }
    Paused --> H : deep_history_event`,
  },
  ganttWithExclusions: {
    name: "56. Gantt Chart with Exclusions (Expanded)",
    code: `gantt
    dateFormat  YYYY-MM-DD
    title Q4 Sprint Plan
    excludes 2024-12-24, 2024-12-25, 2024-12-31, 2025-01-01
    section Sprint 1
    Task A : 2024-12-01, 10d
    Task B : after Task A, 10d
    section Sprint 2
    Task C : 2025-01-02, 12d`,
  },
  mindmapWithIcons: {
    name: "57. Mindmap with Icons",
    code: `mindmap
  root((💡 Bright Ideas))
    - Phase 1
    )💡 Research(
    )💻 Development(
    )🚀 Launch(`,
  },
  timelineWithAges: {
    name: "58. Timeline of a Person's Life",
    code: `timeline
    title Person's Life
    1990 : Born
    2008 : High School Graduation
    2012 : University Graduation
    2015 : First Job
    2020 : Promotion`,
  },
  c4Component: {
    name: "59. C4 Component Diagram (Corrected)",
    code: `C4Component
    title Component diagram for API Application
    
    Container(spa, "Single-Page App", "JavaScript, Angular")
    ContainerDb(db, "Database", "SQL Database")

    Container_Boundary(api, "API Application") {
        Component(logic, "Business Logic", "Java", "Main logic for transactions.")
        Component(auth, "Authentication", "Java", "Handles user authentication.")
        Component(controller, "API Controller", "Java", "Handles incoming API requests.")
    }
    
    Rel(spa, controller, "Uses", "JSON/HTTPS")
    Rel(controller, auth, "Uses")
    Rel(controller, logic, "Uses")
    Rel(logic, db, "Reads from/writes to", "SQL")`,
  },
  gitGraphWithTags: {
    name: "60. Git Graph with Tags",
    code: `gitGraph
    commit
    commit id: "feat-1"
    branch feature
    commit
    commit
    checkout main
    merge feature
    commit id: "v2.0" tag: "v2.0.0"
    commit`,
  },
};
