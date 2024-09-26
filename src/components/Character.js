import React, {useState, useEffect, useRef} from 'react';
import './Character.css';
import floatingStone from '../assets/floating_stone.png';
import background from '../assets/background.png';

import idle1 from '../assets/character-idle-1.png';
import idle2 from '../assets/character-idle-2.png';

import moveLeft2 from '../assets/character-move-left-2.png';
import moveLeft3 from '../assets/character-move-left-3.png';
import moveLeft4 from '../assets/character-move-left-4.png';
import moveLeft5 from '../assets/character-move-left-5.png';

import moveRight2 from '../assets/character-move-right-2.png';
import moveRight3 from '../assets/character-move-right-3.png';
import moveRight4 from '../assets/character-move-right-4.png';
import moveRight5 from '../assets/character-move-right-5.png';

import jump1 from '../assets/character-jump-1.png';
import jump2 from '../assets/character-jump-2.png';
import jump3 from '../assets/character-jump-3.png';
import jump4 from '../assets/character-jump-4.png';
import jump5 from '../assets/character-jump-5.png';
import jump6 from '../assets/character-jump-6.png';
import jump7 from '../assets/character-jump-7.png';

import dock4 from '../assets/character-dock-4.png';
import dock5 from '../assets/character-dock-5.png';

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
    [ACTIONS.DOCK]: [
        dock4, dock5
    ],
    [ACTIONS.JUMP]: [
        jump1,
        jump2,
        jump3,
        jump4,
        jump5,
        jump6,
        jump7
    ]
};

const Character = () => {
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

    const movementRef = useRef(null);
    const animationRef = useRef(null);
    const frameTimerRef = useRef(null);

    const FRAME_DURATION = {
        [ACTIONS.IDLE]: 500,
        [ACTIONS.MOVE_LEFT]: 200,
        [ACTIONS.MOVE_RIGHT]: 200,
        [ACTIONS.JUMP]: 150,
        [ACTIONS.DOCK]: 200
    };

    const MOVE_SPEED = 2.5;

    const BOUNDARY_X = 300;

    const updateFrame = () => {
        if (action === ACTIONS.JUMP) 
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
                if (nextIndex >= ANIMATION_FRAMES[action].length) {
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

    const lastFrameTimeRef = useRef(Date.now());

    useEffect(() => {
        const animationLoop = () => {
            updateFrame();
            animationRef.current = requestAnimationFrame(animationLoop);
        };
        animationLoop();
        return () => cancelAnimationFrame(animationRef.current);

    }, [action, isSDown]);

    const handleKeyDown = (e) => {
        console.log('Key pressed:', e.key);
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

    }, [action, isSDown, isJumping]);

    const initiateJump = () => {
        console.log('Initiate jump called');
        if (!isJumping) {
            setIsJumping(true);
            setAction(ACTIONS.JUMP);
            setFrameIndex(0);

            performJump();
        }
    };

    const performJump = () => {
        const totalDuration = 1000;
        const prepDuration = 300;
        const maxJump = 100;
        const startTime = Date.now();

        const animate = () => {
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

            setPosition(prev => ({
                ...prev,
                y: -jumpHeight
            }));
            setFrameIndex(frameIndex);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {

                setIsJumping(false);
                setAction(ACTIONS.IDLE);
                setFrameIndex(0);
                setPosition(prev => ({
                    ...prev,
                    y: 0
                }));
            }
        };

        setIsJumping(true);
        setAction(ACTIONS.JUMP);
        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const move = () => {
            setPosition((prev) => {
                let newX = prev.x;
                if (action === ACTIONS.MOVE_LEFT) {
                    newX = Math.max(prev.x - MOVE_SPEED, -BOUNDARY_X);
                } else if (action === ACTIONS.MOVE_RIGHT) {
                    newX = Math.min(prev.x + MOVE_SPEED, BOUNDARY_X);
                }
                return {
                    ...prev,
                    x: newX
                };
            });
            movementRef.current = requestAnimationFrame(move);
        };

        if (action === ACTIONS.MOVE_LEFT || action === ACTIONS.MOVE_RIGHT) {
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

    }, [action]);

    const currentFrame = ANIMATION_FRAMES[action][frameIndex] || idle1;

    const characterStyle = {
        left: `calc(50% + ${position.x}px)`,
        bottom: `${ 100 - position.y}px`
    };

    return (
        <div className="game-container">
            <img src={background} alt="Background" className="background"/>
            <img src={floatingStone} alt="Floating Stone" className="floating-stone"/>
            <img
                src={currentFrame}
                alt="Character"
                className="character"
                style={characterStyle}/>
        </div>
    );
};

export default Character;