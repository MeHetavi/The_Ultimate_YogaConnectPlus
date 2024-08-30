import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, Paper } from '@mui/material';

const DynamicSearch = ({ profiles }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProfiles, setFilteredProfiles] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            const results = profiles.filter(profile =>
                profile.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProfiles(results);
        } else {
            setFilteredProfiles([]);
        }
    }, [searchTerm, profiles]);

    return (
        <Box sx={{ marginTop: '5vh', textAlign: 'center' }}>
            <Paper elevation={3} sx={{ width: '70vw', margin: '0 auto', padding: '10px 20px', borderRadius: '22px' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '20px',
                        border: '1px solid #ccc',
                        outline: 'none',
                        fontSize: '16px'
                    }}
                />
            </Paper>
            {filteredProfiles.length > 0 && (
                <Box sx={{ marginTop: '2vh', textAlign: 'left' }}>
                    <List sx={{ width: '70vw', margin: '0 auto' }}>
                        {filteredProfiles.map((profile, index) => (
                            <ListItem key={index} sx={{ background: '#f0f0f0', margin: '5px 0', padding: '10px', borderRadius: '10px' }}>
                                {profile.name}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default DynamicSearch;
