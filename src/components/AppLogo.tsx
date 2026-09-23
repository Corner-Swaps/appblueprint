import React from 'react';

interface AppLogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  expanded15?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({ 
  size = 210, 
  className = '', 
  style = {}, 
  color = '#FFFFFF',
  expanded15 = false,
}) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      className={className}
      style={{ display: 'block', ...style }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="App Blueprint Logo"
    >
      <g fill={color} transform={expanded15 ? "matrix(1.15 0 0 1.15 -76.875 -75.15)" : undefined}>
        {/* Rocket Body & Nose Cone */}
        <path d="M 832 160 L 826 186 L 820 220 L 808 268 L 792 309 L 760 367 L 738 398 L 705 437 L 664 478 L 610 522 L 598 513 L 592 506 L 612 482 L 632 450 L 645 421 L 650 406 L 654 385 L 629 397 L 597 420 L 575 441 L 550 472 L 533 458 L 561 404 L 593 353 L 620 317 L 652 281 L 688 248 L 719 225 L 766 197 L 805 174 L 832 160 Z" />
        {/* Left Delta Fin */}
        <path d="M 576 350 L 578 351 L 543 406 L 521 451 L 509 449 L 484 450 L 418 481 L 485 399 L 505 377 L 542 360 L 575 351 Z" />
        {/* Cockpit Canopy */}
        <path d="M 631 413 L 632 414 L 625 431 L 609 460 L 576 502 L 545 533 L 510 563 L 531 524 L 555 488 L 576 461 L 602 435 L 630 414 Z" />
        {/* Right Delta Fin */}
        <path d="M 704 458 L 705 471 L 702 498 L 697 523 L 691 541 L 607 645 L 626 569 L 625 550 L 619 533 L 658 503 L 704 458 Z" />
        {/* Inner Nozzle Vents */}
        <path d="M 528 475 L 540 484 L 539 488 L 528 504 L 508 486 L 528 475 Z" />
        {/* Left Thrust Exhaust Trails */}
        <path d="M 482 479 L 483 480 L 478 492 L 465 515 L 349 627 L 443 506 L 454 495 L 482 479 Z" />
        <path d="M 431 502 L 431 505 L 425 512 L 370 564 L 370 562 L 412 509 L 431 502 Z" />
        {/* The Verification Checkmark */}
        <path d="M 507 506 L 519 517 L 495 559 L 475 603 L 476 605 L 514 579 L 553 546 L 566 556 L 349 836 L 198 667 L 198 665 L 260 594 L 345 690 L 349 692 L 507 506 Z" />
        {/* Right Nozzle Accent */}
        <path d="M 581 518 L 594 528 L 588 551 L 583 549 L 565 535 L 581 518 Z" />
        {/* Right Thrust Speed Trails */}
        <path d="M 598 575 L 599 578 L 592 599 L 585 612 L 457 765 L 561 605 L 577 589 L 598 575 Z" />
        <path d="M 583 631 L 579 654 L 532 713 L 530 714 L 532 710 L 567 652 L 583 631 Z" />
      </g>
    </svg>
  );
};
