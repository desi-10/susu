import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <main>
      <section className="flex justify-between items-center">
        <h1>Dashboard</h1>
        <div>
          <Button>Download</Button>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-5">
        <div className="border p-5 rounded-lg">
          <div className="flex justify-between">
            <p>Revenue</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-5 rounded-lg">
          <div className="flex justify-between">
            <p>Revenue</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-5 rounded-lg">
          <div className="flex justify-between">
            <p>Revenue</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
        <div className="border p-5 rounded-lg">
          <div className="flex justify-between">
            <p>Revenue</p>
            <p>$</p>
          </div>
          <p>$45,231.89</p>
          <p>+20.1% from last month</p>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
