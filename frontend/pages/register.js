import InnerSection from "../components/register/inner-section";

export default function ContactDark() {
    return <InnerSection />;
}

export async function getStaticProps() {
    return { props: { header: "three", footer: "three" } };
}
