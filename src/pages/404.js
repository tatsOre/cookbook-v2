import Link from "next/link";
import Layout from "../components/Layout";
import useUser from "@/hooks/useUser"

export default function Custom404() {
  const { user } = useUser()

  return (
    <Layout
      headerExtraContent={!user && <Link href="/login">Login</Link>}
    >
      <p className="mt-12 font-light text-3xl">Page not found.</p>
    </Layout>
  )
}
