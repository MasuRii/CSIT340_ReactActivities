import React, {useState, useEffect, useRef} from 'react';

import floatingStone from './assets/floating_stone.png';
import background from './assets/background.png';

import bulletHorizontal from './assets/bullet_horizontal.png';
import bulletVertical from './assets/bullet_vertical.png';

import idle1 from './assets/character-idle-1.png';
import idle2 from './assets/character-idle-2.png';

import moveLeft2 from './assets/character-move-left-2.png';
import moveLeft3 from './assets/character-move-left-3.png';
import moveLeft4 from './assets/character-move-left-4.png';
import moveLeft5 from './assets/character-move-left-5.png';

import moveRight2 from './assets/character-move-right-2.png';
import moveRight3 from './assets/character-move-right-3.png';
import moveRight4 from './assets/character-move-right-4.png';
import moveRight5 from './assets/character-move-right-5.png';

import jump1 from './assets/character-jump-1.png';
import jump2 from './assets/character-jump-2.png';
import jump3 from './assets/character-jump-3.png';
import jump4 from './assets/character-jump-4.png';
import jump5 from './assets/character-jump-5.png';
import jump6 from './assets/character-jump-6.png';
import jump7 from './assets/character-jump-7.png';

import dock4 from './assets/character-dock-4.png';
import dock5 from './assets/character-dock-5.png';

const ACTIONS = {
    IDLE: 'idle',
    MOVE_LEFT: 'move_left',
    MOVE_RIGHT: 'move_right',
    JUMP: 'jump',
    DOCK: 'dock'
};

const ANIMATION_FRAMES = {
    [ACTIONS.IDLE]: [
        idle1, idle2
    ],
    [ACTIONS.MOVE_LEFT]: [
        moveLeft2, moveLeft3, moveLeft4, moveLeft5
    ],
    [ACTIONS.MOVE_RIGHT]: [
        moveRight2, moveRight3, moveRight4, moveRight5
    ],
    [ACTIONS.JUMP]: [
        jump1,
        jump2,
        jump3,
        jump4,
        jump5,
        jump6,
        jump7
    ],
    [ACTIONS.DOCK]: [dock4, dock5]
};

const App = () => {
    const [action,
        setAction] = useState(ACTIONS.IDLE);
    const [frameIndex,
        setFrameIndex] = useState(0);
    const [position,
        setPosition] = useState({x: 0, y: 0});
    const [isJumping,
        setIsJumping] = useState(false);
    const [isSDown,
        setIsSDown] = useState(false);
    const [health,
        setHealth] = useState(100);
    const [gameOver,
        setGameOver] = useState(false);
    const [isFalling,
        setIsFalling] = useState(false);
    const [bullets,
        setBullets] = useState([]);

    const movementRef = useRef(null);
    const animationRef = useRef(null);
    const frameTimerRef = useRef(null);
    const lastFrameTimeRef = useRef(Date.now());

    const FRAME_DURATION = {
        [ACTIONS.IDLE]: 500,
        [ACTIONS.MOVE_LEFT]: 200,
        [ACTIONS.MOVE_RIGHT]: 200,
        [ACTIONS.JUMP]: 150,
        [ACTIONS.DOCK]: 200
    };

    const MOVE_SPEED = 8;
    const BOUNDARY_X = 300;

    const bulletSpeed = 5;

    const updateFrame = () => {
        if (health <= 0) 
            return;
        const now = Date.now();
        if (now - lastFrameTimeRef.current >= FRAME_DURATION[action]) {
            lastFrameTimeRef.current = now;
            setFrameIndex((prev) => {
                const frames = ANIMATION_FRAMES[action];
                if (!frames) 
                    return prev;
                
                if (action === ACTIONS.DOCK) {
                    if (isSDown) {
                        return 0;
                    } else {
                        if (prev === 0) {
                            return 1;
                        } else {
                            setAction(ACTIONS.IDLE);
                            return 0;
                        }
                    }
                }

                const nextIndex = prev + 1;
                if (nextIndex >= frames.length) {
                    if (action === ACTIONS.JUMP) {
                        setIsJumping(false);
                        setAction(ACTIONS.IDLE);
                        return 0;
                    }
                    return 0;
                }
                return nextIndex;
            });
        }
    };

    useEffect(() => {
        const animationLoop = () => {
            updateFrame();
            animationRef.current = requestAnimationFrame(animationLoop);
        };
        animationLoop();
        return () => cancelAnimationFrame(animationRef.current);
    }, [action, isSDown, health]);

    const handleKeyDown = (e) => {
        if (gameOver || isFalling) 
            return;
        if (isJumping) {
            if (e.key.toLowerCase() === 's') {
                if (!isSDown) {
                    setAction(ACTIONS.DOCK);
                    setIsSDown(true);
                }
            }
            return;
        }

        switch (e.key.toLowerCase()) {
            case 'a':
                if (action !== ACTIONS.MOVE_LEFT) {
                    setAction(ACTIONS.MOVE_LEFT);
                    setFrameIndex(0);
                }
                break;
            case 'd':
                if (action !== ACTIONS.MOVE_RIGHT) {
                    setAction(ACTIONS.MOVE_RIGHT);
                    setFrameIndex(0);
                }
                break;
            case 'w':
            case ' ':
                initiateJump();
                break;
            case 's':
                if (!isSDown) {
                    setAction(ACTIONS.DOCK);
                    setIsSDown(true);
                }
                break;
            default:
                break;
        }
    };

    const handleKeyUp = (e) => {
        if (gameOver || isFalling) 
            return;
        switch (e.key.toLowerCase()) {
            case 'a':
            case 'd':
                if (action === ACTIONS.MOVE_LEFT || action === ACTIONS.MOVE_RIGHT) {
                    setAction(ACTIONS.IDLE);
                    setFrameIndex(0);
                }
                break;
            case 's':
                if (action === ACTIONS.DOCK) {
                    setIsSDown(false);
                    setFrameIndex(1);

                    frameTimerRef.current = setTimeout(() => {
                        setAction(ACTIONS.IDLE);
                        setFrameIndex(0);
                    }, FRAME_DURATION[ACTIONS.DOCK]);
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearTimeout(frameTimerRef.current);
        };
    }, [action, isSDown, isJumping, gameOver]);

    const initiateJump = () => {
        if (!isJumping && !gameOver) {
            setIsJumping(true);
            setAction(ACTIONS.JUMP);
            setFrameIndex(0);

            performJump();
        }
    };

    const performJump = () => {
        if (gameOver || isFalling) 
            return;
        const totalDuration = 1000;
        const prepDuration = 300;
        const maxJump = 200;
        const startTime = Date.now();
        const startY = position.y;

        const animate = () => {
            if (gameOver) 
                return;
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / totalDuration, 1);

            let jumpHeight = 0;
            let frameIndex = 0;

            if (progress < prepDuration / totalDuration) {
                if (progress < (prepDuration / totalDuration) / 3) {
                    frameIndex = 0;
                } else if (progress < (prepDuration / totalDuration) * 2 / 3) {
                    frameIndex = 1;
                } else {
                    frameIndex = 2;
                }
            } else {
                const jumpProgress = (progress - prepDuration / totalDuration) / (1 - prepDuration / totalDuration);
                jumpHeight = Math.sin(jumpProgress * Math.PI) * maxJump;

                if (jumpProgress < 0.5) {
                    frameIndex = jumpProgress < 0.25
                        ? 3
                        : 4;
                } else {
                    frameIndex = jumpProgress < 0.75
                        ? 5
                        : 6;
                }
            }

            setPosition(prevPosition => ({
                ...prevPosition,
                y: startY + jumpHeight
            }));

            setFrameIndex(frameIndex);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setIsJumping(false);
                setAction(ACTIONS.IDLE);
                setFrameIndex(0);
                setPosition(prevPosition => ({
                    ...prevPosition,
                    y: startY
                }));
            }
        };

        setIsJumping(true);
        setAction(ACTIONS.JUMP);
        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const move = () => {
            if (health <= 0) 
                return;
            setPosition((prev) => {
                let newX = prev.x;
                if (action.includes(ACTIONS.MOVE_LEFT)) {
                    newX = Math.max(prev.x - MOVE_SPEED, -BOUNDARY_X);
                } else if (action.includes(ACTIONS.MOVE_RIGHT)) {
                    newX = Math.min(prev.x + MOVE_SPEED, BOUNDARY_X);
                }
                return {
                    ...prev,
                    x: newX
                };
            });
            movementRef.current = requestAnimationFrame(move);
        };

        if (action.includes(ACTIONS.MOVE_LEFT) || action.includes(ACTIONS.MOVE_RIGHT)) {
            movementRef.current = requestAnimationFrame(move);
        } else {
            if (movementRef.current) {
                cancelAnimationFrame(movementRef.current);
                movementRef.current = null;
            }
        }

        return () => {
            if (movementRef.current) {
                cancelAnimationFrame(movementRef.current);
                movementRef.current = null;
            }
        };
    }, [action, health]);

    useEffect(() => {
        let animationFrameId;
        const gravity = 0.05;
        let velocityY = 0;

        const fall = () => {
            if (health <= 0) 
                return;
            setPosition((prev) => {
                const stoneWidth = 300;
                const stoneHeight = 305;
                const stoneBottom = 50;

                const characterWidth = 250;

                const stoneLeftEdge = -stoneWidth / 2;
                const stoneRightEdge = stoneWidth / 2;

                const characterX = prev.x;

                const isOverStone = characterX + characterWidth / 2 > stoneLeftEdge && characterX - characterWidth / 2 < stoneRightEdge;

                let newY = prev.y;

                if (isOverStone && newY <= 0) {
                    newY = 0;
                    velocityY = 0;
                    if (isFalling) 
                        setIsFalling(false);
                    }
                else {
                    if (!isFalling && !isJumping && newY <= 0) {
                        setIsFalling(true);
                    }
                    velocityY -= gravity;
                    newY += velocityY;

                    if (newY < -500) {
                        newY = -500;
                        velocityY = 0;
                        if (health > 0) {
                            setHealth(0);
                            setGameOver(true);
                            setAction(ACTIONS.IDLE);
                        }
                    }
                }

                return {
                    ...prev,
                    y: newY
                };
            });

            animationFrameId = requestAnimationFrame(fall);
        };

        fall();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [position.x, health, isFalling]);

    useEffect(() => {
        if (gameOver || isFalling) 
            return;
        const spawnBullet = () => {
            const bulletType = Math.random() < 0.5
                ? 'horizontal'
                : 'vertical';
            let bullet = {
                id: Date.now() + Math.random(),
                type: bulletType,
                isHit: false
            };

            if (bulletType === 'horizontal') {
                const direction = Math.random() < 0.5
                    ? 'leftToRight'
                    : 'rightToLeft';
                bullet.y = Math.random() * window.innerHeight - window.innerHeight / 2;

                if (direction === 'leftToRight') {
                    bullet.x = -window.innerWidth / 2 - 150;
                    bullet.speedX = bulletSpeed;
                    bullet.rotation = 180;
                } else {
                    bullet.x = window.innerWidth / 2 + 150;
                    bullet.speedX = -bulletSpeed;
                    bullet.rotation = 0;
                }
                bullet.speedY = 0;
            } else {
                const direction = Math.random() < 0.5
                    ? 'bottomToTop'
                    : 'topToBottom';
                bullet.x = Math.random() * window.innerWidth - window.innerWidth / 2;

                if (direction === 'bottomToTop') {
                    bullet.y = -window.innerHeight / 2 - 150;
                    bullet.speedY = bulletSpeed;
                    bullet.rotation = 180;
                } else {
                    bullet.y = window.innerHeight / 2 + 150;
                    bullet.speedY = -bulletSpeed;
                    bullet.rotation = 0;
                }
                bullet.speedX = 0;
            }

            setBullets((prevBullets) => [
                ...prevBullets,
                bullet
            ]);
        };

        const intervalId = setInterval(spawnBullet, 500);

        return () => clearInterval(intervalId);
    }, [gameOver]);

    useEffect(() => {
        let animationFrameId;

        const moveBullets = () => {
            setBullets((prevBullets) => prevBullets.map((bullet) => {
                let newBullet = {
                    ...bullet
                };

                if (!newBullet.isHit) {
                    newBullet.x += newBullet.speedX || 0;
                    newBullet.y += newBullet.speedY || 0;

                    const characterWidth = 70;
                    const characterHeight = 100;

                    const characterX = (window.innerWidth / 2 + position.x) - characterWidth / 2;
                    const characterY = 50 + 250 + 20 + position.y;

                    const characterRect = {
                        x: characterX,
                        y: characterY,
                        width: characterWidth,
                        height: characterHeight
                    };

                    const bulletWidth = bullet.type === 'horizontal'
                        ? 243 * 0.25
                        : 118 * 0.25;
                    const bulletHeight = bullet.type === 'horizontal'
                        ? 118 * 0.25
                        : 243 * 0.25;

                    const bulletX = (window.innerWidth / 2 + newBullet.x) - bulletWidth / 2;
                    const bulletY = 50 + 250 + 20 + newBullet.y;

                    const bulletRect = {
                        x: bulletX,
                        y: bulletY,
                        width: bulletWidth,
                        height: bulletHeight
                    };

                    if (characterRect.x < bulletRect.x + bulletRect.width && characterRect.x + characterRect.width > bulletRect.x && characterRect.y < bulletRect.y + bulletRect.height && characterRect.y + characterRect.height > bulletRect.y) {
                        setHealth((prevHealth) => Math.max(prevHealth - 10, 0));
                        newBullet.isHit = true;
                        newBullet.hitTime = Date.now();
                    }

                    if (newBullet.x < -window.innerWidth / 2 - 200 || newBullet.x > window.innerWidth / 2 + 200 || newBullet.y < -window.innerHeight / 2 - 200 || newBullet.y > window.innerHeight / 2 + 200) {
                        return null;
                    }
                } else {
                    if (Date.now() - newBullet.hitTime > 500) {
                        return null;
                    }
                }

                return newBullet;
            }).filter(Boolean));

            animationFrameId = requestAnimationFrame(moveBullets);
        };

        moveBullets();

        return () => cancelAnimationFrame(animationFrameId);
    }, [position]);

    const currentFrame = ANIMATION_FRAMES[action][frameIndex] || idle1;

    const characterStyle = {
        position: 'absolute',
        width: '150px',
        height: 'auto',
        imageRendering: 'auto',
        transition: 'none',
        left: `calc(50% + ${position.x}px)`,
        bottom: `calc(50px + 250px + 20px + ${position.y}px)`,
        transform: 'translateX(-50%)'
    };

    const backgroundStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        filter: gameOver
            ? 'brightness(0.5)'
            : 'none'
    };

    const floatingStoneStyle = {
        position: 'absolute',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '590px',
        height: '305px',
        filter: gameOver
            ? 'brightness(0.5)'
            : 'none'
    };

    const gameContainerStyle = {
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: gameOver
            ? '#000'
            : '#fff'
    };

    const gameOverStyle = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: '#fff',
        fontSize: '48px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '30px',
        borderRadius: '15px',
        fontFamily: 'Arial, sans-serif'
    };

    const restartButtonStyle = {
        backgroundColor: '#ff4757',
        color: '#fff',
        padding: '15px 30px',
        fontSize: '24px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '20px'
    };

    const createdByStyle = {
        fontSize: '18px',
        color: '#fff'
    };

    const healthBarContainerStyle = {
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '200px',
        height: '20px',
        backgroundColor: '#333',
        border: '2px solid #fff',
        borderRadius: '10px',
        overflow: 'hidden'
    };

    const healthBarFillStyle = {
        width: `${health * 2}px`,
        height: '100%',
        backgroundColor: 'green',
        transition: 'width 0.5s',
        borderRadius: '10px 0 0 10px'
    };

    return (
        <div style={gameContainerStyle}>
            <img src={background} alt="Background" style={backgroundStyle}/>
            <img src={floatingStone} alt="Floating Stone" style={floatingStoneStyle}/> {health > 0
                ? (<img src={currentFrame} alt="Character" style={characterStyle}/>)
                : (
                    <div style={gameOverStyle}>
                        <h1>Game Over</h1>
                        <button style={restartButtonStyle} onClick={() => window.location.reload()}>
                            Restart
                        </button>
                        <hr></hr>
                        <p style={createdByStyle}>PATUTI GAME</p>
                        <p style={createdByStyle}>Created by: Math Lee L. Biacolo</p>
                    </div>
                )}
            <div style={healthBarContainerStyle}>
                <div style={healthBarFillStyle}></div>
            </div>
            {bullets.map((bullet) => (<img
                key={bullet.id}
                src={bullet.type === 'horizontal'
                ? bulletHorizontal
                : bulletVertical}
                style={{
                position: 'absolute',
                width: bullet.type === 'horizontal'
                    ? `${ 243 * 0.25}px`
                    : `${ 118 * 0.25}px`,
                height: bullet.type === 'horizontal'
                    ? `${ 118 * 0.25}px`
                    : `${ 243 * 0.25}px`,
                left: `calc(50% + ${bullet.x}px)`,
                bottom: `calc(50px + 250px + 20px + ${bullet.y}px)`,
                transform: `translate(-50%, -50%) rotate(${bullet.rotation}deg)`,
                transition: bullet.isHit
                    ? 'opacity 0.5s'
                    : 'none',
                opacity: bullet.isHit
                    ? 0
                    : 1
            }}/>))}
        </div>
    )
};

export default App;