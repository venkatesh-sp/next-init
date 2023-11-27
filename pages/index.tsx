import withAuth from "@/components/hoc/withAuth"

const Dashboard = () => {
  return (
    <>
      This is Dashboard with Protection
    </>
  )
}

export default withAuth(Dashboard)
