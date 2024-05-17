import styles from "../../../styles/person.module.css";

export async function generateMetadata({ params: { id } }) {
  const person: IPerson = await getPerson(id);
  return {
    title: person.name,
  };
}

const BASE_URL = "https://billions-api.nomadcoders.workers.dev/person/";

async function getPerson(id: string) {
  const json = await (await fetch(`${BASE_URL}${id}`)).json();
  return json;
}

interface IPerson {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  industries: [string];
  financialAssets: [
    {
      ticker: string;
      numberOfShares: number;
      exerciseOptionPrice: number;
    }
  ];
  thumbnail: string;
  squareImage: string;
  bio: [string];
  about: [string];
  netWorth: number;
}

export default async function Person({ params: { id } }) {
  const person: IPerson = await getPerson(id);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img src={person.squareImage} />
        <h1>{person.name}</h1>
        <span>Nerworth : {Math.floor(person.netWorth / 1000)} Billion</span>
        <span>Country : {person.country}</span>
        <span>Industry: {person.industries}</span>
        <p>{person.bio}</p>
      </div>
      <div className={styles.box}>
        <h1>Financial Assets</h1>
        <ul>
          {person.financialAssets.map((asset) => (
            <li>
              <span>Ticker : {asset.ticker}</span>
              <span>Shares : {asset.numberOfShares.toLocaleString()}</span>
              {asset.exerciseOptionPrice ? (
                <span>Excersie Price : ${asset.exerciseOptionPrice}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
