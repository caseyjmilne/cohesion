<?php get_header(); ?>

<header class="site-header">
    <section class="site-header__left">
        <div class="logo">
            <svg class="logo__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 1.7-.1 3.4-.3 5L272 288l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-1.7 .1-3.4 .3-5L144 224l-96 0c-26.5 0-48-21.5-48-48L0 80z"/></svg>
        </div>
        <nav class="menu">
            <ul class="menu__list">
                <li class="menu__list-item">
                    <a class="menu__link" href="#">Features</a>
                </li>
                <li class="menu__list-item">
                    <a class="menu__link" href="#">About</a>
                </li>
                <li class="menu__list-item">
                    <a class="menu__link" href="#">Docs</a>
                </li>
            </ul>
        </nav>
    </section>
    <button class="cta-button">
        DOWNLOAD
    </button>
</header>

<section class="hero">
    <h1 class="hero__intro">
        Make it fire, create it with Cohesion.
    </h1>
    <h3 class="hero__text">
        The most efficient WordPress editing studio.
    </h3>
    <h5 class="hero_version">Cohesion v0.6.4 for WordPress</h5>
    <img class="hero__screenshot" src="<?php echo get_template_directory_uri(); ?>/assets/images/screenshot.jpg" />
</section>

<style>

/* Site Header (.site-header) */
:root {
    --color-secondary: oklch(97% 0.001 106.424);
}

.site-header {
    --space: 1rem;
    --space-1: 1px;
    --space-2: 0.125rem;
    --space-3: 0.25rem;
    --space-4: 0.5rem;
    --color: oklch(45.5% 0.188 13.697);
    --color-offset: oklch(21.6% 0.006 56.043);
    --color-secondary: oklch(97% 0.001 106.424);
    --icon-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space);
    padding: var(--space);
    background-color: var(--color-offset);
}

.site-header__left {
    display: flex;
    align-items: center;
    gap: 24px;
}

.logo {
    color: white; 
}

.logo__icon {
    width: var(--icon-size);
    fill: var(--color-secondary);
}

.cta-button {
    background-color: var(--color);
    color: white;
    border-radius: 8px;
    padding: var(--space-4) var(--space);
    cursor: pointer;
}

.menu__list {
    display: flex;
    gap: var(--space);
}

.menu__link {
    color: white;
    font-size: 1rem;
    font-weight: 800;
    font-family: "Lato", sans-serif;
}

/* Hero */
.hero {
    background-image: url('<?php echo get_template_directory_uri(); ?>/assets/images/red.jpg');
    background-repeat: none;
}
.hero__intro {
    max-width: 640px;
    margin: 0 auto 1rem auto;
    padding: 4rem 1rem 0rem 1rem;
    font-size: 5rem;
    font-weight: 700;
    color: var(--color-secondary);
    text-align: center;
    line-height: 5rem;
}
.hero__text {
    font-weight: 600;
    font-size: 1.25rem;
    text-align: center;
    color: oklch(92.3% 0.003 48.717);
    max-width: 420px;
    margin: 0 auto 6rem auto;
}
.hero_version {
    max-width: 800px;
    margin: 0 auto;
    color: var(--color-secondary);
}
.hero__screenshot {
    max-width: 800px;
    margin: 0 auto;
    border-radius: 0 2rem 0 0;
}

</style>

<?php get_footer(); ?>


