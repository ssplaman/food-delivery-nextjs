import Image from 'next/image'
import classes from './page.module.css'
import { notFound } from 'next/navigation';
import { GetRestaurantBySlug } from '../../api/restaurant/route';
import Link from 'next/link';
import BackButton from '@/_components/backButton/backButton';

const Restaurant = async ({ params }) => {
    const { restaurantName } = await params;
    let restaurant = await GetRestaurantBySlug(restaurantName);

    if (!restaurant) {
        notFound();
    }

    return (
        <main className={classes.container}>
            <BackButton />
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={restaurant.image} alt={restaurant.name} width={140} height={140} />
                </div>
                <div className={classes.headerText}>
                    <h1>{restaurant.name}</h1>
                    <p className={classes.creator}>
                        <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
                    </p>
                    <p className={classes.summary}>{restaurant.description}</p>
                </div>
            </header>

            <section className={classes.actions}>
                <Link href={`/admin/${restaurantName}/edit`}>
                    <button className={classes.actionBtn}>Edit Restaurant Details</button>
                </Link>
                <Link href={`/admin/${restaurantName}/add-meal`}>
                    <button className={classes.actionBtn}>Add New Meal</button>
                </Link>
            </section>

            <section className={classes.mealList}>
                <h2>Menu</h2>
                {restaurant.recipes?.length > 0 ? (
                    <ul className={classes.grid}>
                        {restaurant.recipes.map((item) => {
                            return (
                                <li key={item.id} className={classes.mealCard}>
                                    <Image src={item.image} alt={item.title} width={120} height={120} />
                                    <div className={classes.mealInfo}>
                                        <p>{item.title}</p>
                                        <br />
                                        <p>{item.summary}</p>
                                        <div className={classes.mealActions}>
                                            <span>{Number(item.price)?.toFixed(2) || '—'}</span>
                                            <Link href={`/admin/${restaurantName}/edit-meal/${item.title}`}>
                                                <button className={classes.cartBtn}>Edit</button>
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <p>No meals available for this restaurant.</p>
                )}
            </section>
        </main>
    )
}

export default Restaurant