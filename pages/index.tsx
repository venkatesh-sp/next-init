import withAuth from "@/components/hoc/withAuth"

const Dashboard = () => {
  return (
    <div>This is Dashboard with Protection</div>
  )
}

export default withAuth(Dashboard)
