import React from 'react';
import * as Material from '@mui/material';

export interface HeaderBarProps {
  title?: string;
  element?: React.ReactNode;
  actions?: React.ReactNode;
  bottom?: React.ReactNode;
  shadowLevel?: number;
  onBackPressed?: Function
}

const HeaderBar = ({
  title,
  element,
  actions,
  bottom,
  shadowLevel = 0,
  onBackPressed,
}: HeaderBarProps) => {
    return (
        <Material.AppBar color="default" position="fixed" sx={{ boxShadow: shadowLevel }}>
            <Material.Toolbar>
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        textAlign: 'center',
                        alignItems: 'center',
                    }}
                >
                    {title ? (
                    <Material.Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                    {title}
                    </Material.Typography>
                    ) : (
                        element
                    )}
                </div>
            </Material.Toolbar>
        </Material.AppBar>
    );
};

export default HeaderBar;