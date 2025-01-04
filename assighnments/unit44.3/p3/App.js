function App() {
  return (
    <div>
      <Person
        name="wally"
        age={38}
        hobbies={["coding", "drawing", "drinking beer"]}
      />
      <Person name="you" age={34} hobbies={["watching me", "gambling"]} />
      <Person
        name="PDiddy"
        age={10}
        hobbies={["baby oil", "making prank calls"]}
      />
      <Person
        name="tall"
        age={8}
        hobbies={["short", "eating vegetables"]}
      />
    </div>
  );
}
