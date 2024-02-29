import React, { useState } from 'react';
import '../components/RaagFinder.css';
import SearchResult from './SearchResult'; 
import SwarFinder from './SwarFinder'; 
import searchRaagBySwars from './SearchBySwar'; 

const allNotes = ['S', 'r', 'R', 'g', 'G', 'm', 'M', 'P', 'd', 'D', 'n', 'N','S'];

function RaagaFinder() {
    const [selectedNotesAaroha, setSelectedNotesAaroha] = useState([]);
    const [selectedNotesAvaroh, setSelectedNotesAvaroh] = useState([]);
    const [searchResult, setSearchResult] = useState('');
    const [activePage, setActivePage] = useState('raagFinder');

    // Function to handle search based on aaroha and avaroh
    const searchByAarohaAvaroh = () => {
        //const swars = [...selectedNotesAaroha, ...selectedNotesAvaroh];
        const matchingRaagas = searchRaagBySwars(selectedNotesAaroha,selectedNotesAvaroh); // Call SearchBySwar with the selected swars
        setSearchResult(matchingRaagas); // Set the result in the state
    };

    // Function to add or remove a note from aaroha or avaroh
    const [lastSelectedAaroha, setLastSelectedAaroha] = useState(null);
    const [lastSelectedAvaroh, setLastSelectedAvaroh] = useState(null);
    
    const toggleNote = (note, type) => {
        if (type === 'aaroha') {
            if (selectedNotesAaroha.includes(note)) {
                setSelectedNotesAaroha(selectedNotesAaroha.filter(n => n !== note));
            } else {
                setSelectedNotesAaroha(prevNotes => {
                    const lastIndex = lastSelectedAaroha ? allNotes.indexOf(lastSelectedAaroha) : -1;
                    let newNotes = [...prevNotes];
                    newNotes.splice(lastIndex + 1, 0, note);
                    setLastSelectedAaroha(note);
                    return newNotes;
                });
            }
        } else if (type === 'avaroh') {
            if (selectedNotesAvaroh.includes(note)) {
                setSelectedNotesAvaroh(selectedNotesAvaroh.filter(n => n !== note));
            } else {
                setSelectedNotesAvaroh(prevNotes => {
                    const lastIndex = lastSelectedAvaroh ? allNotes.indexOf(lastSelectedAvaroh) : -1;
                    let newNotes = [...prevNotes];
                    newNotes.splice(lastIndex + 1, 0, note);
                    setLastSelectedAvaroh(note);
                    return newNotes;
                });
            }
        }
    };
    


    // Function to clear all selected notes
    const clearSelection = () => {
        setSelectedNotesAaroha([]);
        setSelectedNotesAvaroh([]);
    };

    const handlePageToggle = (page) => {
        setActivePage(page);
    }

    return (
        <div className="container">
            <header>
                <h1>Know Your Raaga</h1>
                <nav>
                    <ul>
                        <li className={activePage === 'raagFinder' ? 'active' : ''}>
                            <button onClick={() => handlePageToggle('raagFinder')}>Raag Finder</button>
                        </li>
                        <li className={activePage === 'swarFinder' ? 'active' : ''}>
                            <button onClick={() => handlePageToggle('swarFinder')}>Swar Finder</button>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                {activePage === 'raagFinder' && (
                    <div className="page-section">
                        <h2 className="center">Raag Finder</h2>
                        <div className="notes-selector">
                            <div className="aaroha">
                                <h3>Aaroha</h3>
                                <div className="notes-container">
                                    {/* Display selectable notes for Aaroha */}
                                    {allNotes.map(note => (
                                        <div 
                                            key={note}
                                            className={`note ${selectedNotesAaroha.includes(note) ? 'selected' : ''}`}
                                            onClick={() => toggleNote(note, 'aaroha')}
                                        >
                                            {note}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="avaroh">
                                <h3>Avaroh</h3>
                                <div className="notes-container">
                                    {/* Display selectable notes for Avaroh in reverse order */}
                                    {allNotes.slice().reverse().map(note => (
                                        <div 
                                            key={note}
                                            className={`note ${selectedNotesAvaroh.includes(note) ? 'selected' : ''}`}
                                            onClick={() => toggleNote(note, 'avaroh')}
                                        >
                                            {note}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {selectedNotesAvaroh.map((note)=><p>{note}</p>)}
                        <div className="button-group">
                            <button className='search-button' onClick={searchByAarohaAvaroh}>Search</button>
                            <button className='clear-button' onClick={clearSelection}>Clear</button>
                        </div>
                        <SearchResult result={searchResult} />
                    </div>
                )}
                {activePage === 'swarFinder' && (
                    <div className="page-section">
                        <h2>Swar Finder</h2>
                        <SwarFinder />
                    </div>
                )}
            </main>
        </div>
    );
}


export default RaagaFinder;
