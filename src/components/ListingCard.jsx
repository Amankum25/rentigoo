import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

/**
 * ListingCard
 * Props: {
 *  id, title, image, pricePerDay, location, category, owner, rating, reviewsCount, availability
 * }
 */
const ListingCard = ({
  id,
  title,
  image,
  pricePerDay,
  location,
  category,
  owner,
  rating = 0,
  reviewsCount = 0,
  availability = "Available",
}) => {
  return (
    <Link to={`/product/${id}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg border-border/60">
        <div className="relative aspect-video overflow-hidden">
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur text-xs">{category}</Badge>
          </div>
          <div className="absolute top-2 right-2">
            <Badge variant={availability === "Available" ? "default" : "destructive"} className="text-xs">
              {availability}
            </Badge>
          </div>
        </div>
        <CardContent className="flex flex-col flex-1 p-4 gap-2">
          <h3 className="font-semibold line-clamp-2 text-sm md:text-base min-h-[2.5rem]">{title}</h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{location}</span>
            <span>{owner}</span>
          </div>
          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({reviewsCount})</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">₹{pricePerDay} <span className="text-xs font-normal text-muted-foreground">/day</span></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
