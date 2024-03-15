export const About = async () => {
  //SSG
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "/companyInfo");

  const companyInfo = await resp.json();
  return (
    <div>
      <h1>회사명:{companyInfo.name}</h1>
      <h1>주소:{companyInfo.address}</h1>
      <h1>연락처:{companyInfo.phone}</h1>
    </div>
  );
};

export default About;
