interface LaunchSite {
    site_name: string;
    site_name_long: string;
}

interface Rocket {
    rocket_name: string;
    rocket_type: string;
}

interface Links {
    flickr_images: string[];
    video_link: string;
    article_link: string;
}

interface LaunchInformation extends Launch {
    details: string;
    launch_success: boolean;
    launch_year: string;
    rocket: Rocket;
    links: Links;
}

interface Launch {
    id: string;
    mission_name: string;
    launch_date_local: Date;
    launch_site: LaunchSite;
}

interface SavedLaunch {
    id: ID;
    mission_name: string
}

