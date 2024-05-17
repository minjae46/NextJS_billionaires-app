import Link from "next/link";
import styles from "../../styles/home.module.css";

export const metadata = {
  title: "HOME",
};

const API_URL = "https://billions-api.nomadcoders.workers.dev/";

async function getPersons() {
  const json = await (await fetch(API_URL)).json();
  return json;
}

interface IPerson {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: [string];
}

export default async function Home() {
  const persons = await getPersons();
  return (
    <div className={styles.container}>
      {persons.map((person: IPerson) => (
        <Link
          className={styles.person}
          key={person.id}
          prefetch
          href={`person/${person.id}`}
        >
          <img src={person.squareImage} alt={person.name} />
          <h3>{person.name}</h3>
          <span>
            {Math.floor(person.netWorth / 1000)} Billion / {person.industries}
          </span>
        </Link>
      ))}
    </div>
  );
}
