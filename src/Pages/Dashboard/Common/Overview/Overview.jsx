import OverviewCards from "@/Components/Dashboard/Overview/OverviewCards";
import useAuth from "@/Hook/useAuth";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";

const Overview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: overview = {}, isLoading } = useQuery({
        queryKey: ["overview-details", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/overview-details?email=${user.email}`);
            return data;
        },
    });

    console.log(overview);

    const stats = {
        totalUsers: 1500,
        totalPets: 250,
        totalDonations: 500,
        myPets: 10,
        myDonations: 15,
        myAdoptedPets: 5,
        myAdoptionRequests: 8,
        myAddedPets: 7,
        totalRevenue: "$12,500",
    };

    const donationData = [
        { name: "Jan", donations: 400 },
        { name: "Feb", donations: 300 },
        { name: "Mar", donations: 500 },
        { name: "Apr", donations: 700 },
        { name: "May", donations: 600 },
    ];

    const petData = [
        { name: "Adopted", value: stats.myAdoptedPets },
        { name: "My Added Pets", value: stats.myAddedPets },
    ];

    const COLORS = ["#4CAF50", "#FF9800"];

    if (isLoading) <div>Loading...</div>

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

            {/* Summary Cards */}
            <OverviewCards overview={overview} />

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-dark-lite p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Donations Over Time</h2>
                    <BarChart width={400} height={250} data={donationData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="donations" fill="#4F46E5" />
                    </BarChart>
                </div>

                {/* Pie Chart */}
                <div className="bg-dark-lite p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">My Pets Overview</h2>
                    <PieChart width={400} height={250}>
                        <Pie data={petData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                            {petData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default Overview;
