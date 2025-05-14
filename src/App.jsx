import { useState } from "react";

function Card({ children }) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white flex flex-col items-center w-full">
      {children}
    </div>
  );
}

function Button({ onClick, children, className = "", disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}

function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border px-3 py-2 rounded w-full"
    />
  );
}

function Tabs({ children }) {
  return <div className="w-full">{children}</div>;
}

function TabsList({ children }) {
  return <div className="flex justify-center space-x-2 mb-4">{children}</div>;
}

function TabsTrigger({ value, activeTab, onClick, children }) {
  const isActive = value === activeTab;
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-2 rounded transition ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, activeTab, children }) {
  return activeTab === value ? <div className="w-full">{children}</div> : null;
}

const games = [
  { id: 1, title: "Elden Ring", price: 59.99 },
  { id: 2, title: "God of War", price: 49.99 },
  { id: 3, title: "Hades", price: 19.99 },
];

export default function GameMarketplace() {
  const [users, setUsers] = useState({});
  const [activeProfile, setActiveProfile] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [activeTab, setActiveTab] = useState("marketplace");

  const addProfile = () => {
    if (!profileName) return;
    setUsers((prev) => ({ ...prev, [profileName]: [] }));
    setProfileName("");
  };

  const buyGame = (game) => {
    if (!activeProfile) return;
    setUsers((prev) => ({
      ...prev,
      [activeProfile]: [...prev[activeProfile], game],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">🎮 Game Marketplace</h1>

          <div className="flex flex-col items-center mb-6">
            <div className="w-full max-w-md flex space-x-2 mb-4">
              <Input
                placeholder="Enter new profile name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
              <Button onClick={addProfile}>Add Profile</Button>
            </div>
          </div>

          <Tabs>
            <TabsList>
              <TabsTrigger
                value="marketplace"
                activeTab={activeTab}
                onClick={setActiveTab}
              >
                Marketplace
              </TabsTrigger>
              <TabsTrigger
                value="mygames"
                activeTab={activeTab}
                onClick={setActiveTab}
              >
                My Games
              </TabsTrigger>
            </TabsList>

            <TabsContent value="marketplace" activeTab={activeTab}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {games.map((game) => (
                  <Card key={game.id}>
                    <h2 className="text-xl font-semibold text-center">{game.title}</h2>
                    <p className="text-gray-600 text-center mb-2">${game.price}</p>
                    <Button
                      onClick={() => buyGame(game)}
                      disabled={!activeProfile}
                      className="w-full"
                    >
                      Buy
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mygames" activeTab={activeTab}>
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2 mb-4 w-full max-w-md">
                  <label className="font-medium">Select Profile:</label>
                  <select
                    onChange={(e) => setActiveProfile(e.target.value)}
                    className="border rounded px-2 py-1 flex-grow"
                    value={activeProfile || ""}
                  >
                    <option value="">-- Select --</option>
                    {Object.keys(users).map((profile) => (
                      <option key={profile} value={profile}>
                        {profile}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full max-w-md">
                  {activeProfile && users[activeProfile]?.length > 0 ? (
                    <ul className="space-y-2">
                      {users[activeProfile].map((game, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center border-b pb-2"
                        >
                          <span>{game.title}</span>
                          <span className="text-gray-600">${game.price}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-gray-500">
                      {activeProfile
                        ? "No games purchased yet."
                        : "Please select a profile."}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}