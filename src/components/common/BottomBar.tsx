import React from 'react';
import * as Material from '@mui/material';
import Home from '../../assets/ic_nav_home.png';
import HomeSelected from '../../assets/ic_nav_home_selected.png';
import Profile from '../../assets/ic_nav_profile.png';
import ProfileSelected from '../../assets/ic_nav_profile_selected.png';
import Favorite from '../../assets/ic_heart.png'
import FavoriteSelected from '../../assets/ic_heart2.png'
import { TabMenu } from '../../App';

interface BottomBarProps {
    tab: TabMenu,
    onTabChange: Function,
}

const BottomBar = ({ tab, onTabChange }: BottomBarProps) => {
    return (
        <Material.Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, boxShadow: 3, zIndex: 10 }}
        >
            <Material.BottomNavigation showLabels value={tab} onChange={(_, tab) => onTabChange(tab)}>
                <Material.BottomNavigationAction
                    icon={
                        <img
                        src={tab === "Home" ? HomeSelected : Home}
                        alt="홈"
                        style={{ width: '24px', height: '24px', padding: '2px' }}
                        />
                    }
                    label="홈"
                    value={"Home"}
                    sx={{ '&.Mui-selected': { color: 'black' } }}
                />
                <Material.BottomNavigationAction
                    icon={
                        <img
                        src={tab === "Favorite" ? FavoriteSelected : Favorite}
                        alt="즐겨찾기"
                        style={{ width: '24px', height: '24px', padding: '2px' }}
                        />
                    }
                    label="즐겨찾기"
                    value={"Favorite"}
                    sx={{ '&.Mui-selected': { color: 'black' } }}
                />
                <Material.BottomNavigationAction
                    icon={
                        <img
                        src={tab === "Profile" ? ProfileSelected : Profile}
                        alt="내 정보"
                        style={{ width: '18px', height: '24px', padding: '2px' }}
                        />
                    }
                    label="내 정보"
                    value={"Profile"}
                    sx={{ '&.Mui-selected': { color: 'black' } }}
                />
            </Material.BottomNavigation>
        </Material.Paper>
    );
};

export default BottomBar;